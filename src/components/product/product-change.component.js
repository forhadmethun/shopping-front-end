import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeFromCurrentWindow, changeProductMessage} from "../../actions/product.action";

const ProductChangeModal = () => {

    const dispatch = useDispatch();

    const productChangeMessage = useSelector(state => state?.product?.changeMessage) || '';
    const isChangedFromCurrentWindow = useSelector(state => state?.product?.changeFromCurrentWindow) || false;

    const close = () => {
        dispatch(changeProductMessage(''));
        dispatch(changeFromCurrentWindow(false));
    }

    return (
        <Modal show={!!productChangeMessage && !isChangedFromCurrentWindow} onHide={close}>
            <Modal.Header style={{borderBottom: "0px"}}>
                <Button style={{position: "absolute", top: 0, right: 0, fontSize: "1.7rem", color: "#bfbebe"}}
                        variant="none" onClick={close}>
                    X
                </Button>
            </Modal.Header>
            <Modal.Body>
                <h3 style={{fontWeight: "bold"}}>Someone changed the data: </h3>
                <br/>
                 <p>{productChangeMessage}</p>
            </Modal.Body>
            <Modal.Footer style={{borderTop: "0px"}}>
                <Button style={{width: "40%"}} variant="outline-info" onClick={close}>
                    Close
                </Button>
                <br/>
            </Modal.Footer>
        </Modal>
    );
}


export default ProductChangeModal;
