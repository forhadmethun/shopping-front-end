import {Container, Table} from 'react-bootstrap';
import SockJsClient from 'react-stomp';
import ProductDetailsModal from "./product-details.component";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeFromCurrentWindow,
    changeProductMessage,
    findAllProducts,
    getUserProductCartItems
} from "../../actions/product.action";
import ProductChangeModal from "./product-change.component";

const ProductList = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state?.auth?.user)?.id;
    const numberOfProductInCart = useSelector(state => state?.cart?.numberOfProductInCart)
    const isChangedFromCurrentWindow = useSelector(state => state?.product?.changeFromCurrentWindow) || false;

    const [showProduct, setShowProduct] = useState(false);
    const [product, setProduct] = useState(undefined);

    const products = useSelector(state => state?.product?.products)

    const handleClose = () => setShowProduct(false);

    const processProductMessageChange = (msg) => {
        if (isChangedFromCurrentWindow) {
            dispatch(changeProductMessage(''));
            dispatch(changeFromCurrentWindow(false));
        }
        else {
            dispatch(changeProductMessage(msg));
            dispatch(findAllProducts());
        }
    }

    const setProductAndShow = (product) => {
        setProduct(product);
        setShowProduct(true);
    }

    useEffect(()=> {
        dispatch(findAllProducts());
        if(userId){
            dispatch(getUserProductCartItems(userId));
        }
    }, [dispatch, userId]);

    return (
        <Container>
            <div className="row">
                <div className="col-md-8">
                    <h1>Products</h1>
                </div>
                <div className="col-md-4" style={{textAlign: "right"}}>
                    {numberOfProductInCart > 0 && <h5>Total in Cart: {numberOfProductInCart}</h5>}
                </div>
            </div>

            <Table hover>
                <thead>
                <tr>
                    <th style={{width: "15%"}}>#</th>
                    <th style={{width: "70%"}}>Name</th>
                    <th style={{width: "15%"}}>Available item(s)</th>
                </tr>
                </thead>
                <tbody>
                {products?.map(
                    product =>
                        <tr key={product.id} onClick={() => setProductAndShow(product)}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                                <p style={{border: "1px solid black", textAlign: "center"}}>
                                    {product.numberOfAvailableItems}
                                </p>
                            </td>
                        </tr>
                )}
                </tbody>
            </Table>
            <ProductDetailsModal show={showProduct} close={handleClose} product={product}/>

            <ProductChangeModal />
            <SockJsClient url='http://localhost:8080/ws' topics={['/topic/public']} onMessage={processProductMessageChange} />
        </Container>
    )
}

export default ProductList;
