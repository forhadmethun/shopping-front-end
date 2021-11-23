import {Alert, Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addProductToCart,
    changeFromCurrentWindow,
    getUserProductCartItems,
    removeProductFromCart
} from "../../actions/product.action";

const ProductDetailsModal = ({show, close, product}) => {

    const dispatch = useDispatch();

    let [selectedItems, setSelectedItems] = useState(1);
    let [showAlert, setShowAlert] = useState(false);

    const {isLoggedIn} = useSelector(state => state?.auth) || false;
    const user = useSelector(state => state?.auth?.user);
    const productInCart = useSelector(state => state?.cart?.userProductCart);

    const addToCart = () => {
        if(!isLoggedIn) {
            setShowAlert(true);
            return;
        }
        if(selectedItems === 0 || product?.numberOfAvailableItems === 0) {
            return;
        }
        const productCart = {
            userId: user?.id,
            productId: product?.id,
            numberOfItems: selectedItems
        };

        dispatch(changeFromCurrentWindow(true));
        dispatch(addProductToCart(productCart)).then(()=> {
            if(user?.id){
                dispatch(getUserProductCartItems(user?.id));
            }
        }).then(close);

    }

    const removeFromCart = () => {
        if(!isLoggedIn) {
            setShowAlert(true);
            return;
        }
        const productCart = {
            userId: user?.id,
            productId: product?.id,
            numberOfItems: selectedItems
        };

        dispatch(changeFromCurrentWindow(true));
        dispatch(removeProductFromCart(productCart)).then(() => {
            if(user?.id){
                dispatch(getUserProductCartItems(user?.id));
            }
        }).then(close);

    }

    return (
        <Modal show={show} size="lg" onHide={close}>
            <Modal.Header style={{borderBottom: "0px"}}>
                <Button style={{position: "absolute", top: 0, right: 0, fontSize: "1.7rem", color: "#bfbebe"}}
                        variant="none" onClick={close}>
                    X
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={7}>
                        <p>
                            <span>{product?.rank}</span>&nbsp;
                            <span style={{fontSize: "200%", fontWeight: "bold"}}>
                                {product?.name} {product?.color}
                            </span>
                        </p>
                        <p style={{paddingLeft: "6%"}}>{product?.description}</p>
                    </Col>
                    <Col md={5}>
                        <p style={{textAlign: "center", paddingBottom: "15%"}}>
                            <span style={{float: "left", fontSize: "180%"}}>${product?.price}</span>
                            <span>
                                <input
                                    style={{width: "20%", float: "right"}}
                                    value={selectedItems}
                                    onChange={(e) => setSelectedItems(e?.target?.value && parseInt(e?.target?.value))}
                                />
                            </span>
                        </p>
                        <p style={{textAlign: "center"}}>
                            <Button onClick={addToCart} style={{width: "100%", color: "black"}} variant="outline-success">
                                add to cart
                            </Button>
                        </p>
                        <p style={{textAlign: "center"}}>
                            <Button onClick={removeFromCart} style={{width: "100%", color: "black"}} variant="outline-warning">
                                remove from cart
                            </Button>
                        </p>
                        <p style={{textAlign: "center"}}>this item in cart: {productInCart?.find(p => p.productId === product?.id)?.numberOfItems || 0}</p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{borderTop: "0px"}}>
                <Button style={{width: "40%"}} variant="outline-info" onClick={close}>
                    Close
                </Button>
                <br/>

            </Modal.Footer>
            <Container>
                <div align="center">
                    <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)}>
                        <p>
                            Please  <a href="/register">sign-up</a> / <a href="/login">login</a> and then try.
                        </p>
                    </Alert>
                </div>
            </Container>
        </Modal>
    );
}

export default ProductDetailsModal;
