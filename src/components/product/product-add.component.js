import React, {useState} from "react";
import {useDispatch} from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {addProduct} from "../../actions/product.action";

const ProductAdd = () => {

    const dispatch = useDispatch();

    const [successful, setSuccessful] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [numberOfAvailableItems, setNumberOfAvailableItems] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [rank, setRank] = useState(undefined);
    const [checkBtn, setCheckBtn] = useState(undefined);
    const [form, setForm] = useState(undefined);

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            dispatch(addProduct({
                name, color, description, numberOfAvailableItems, price, rank
            }))
        }
    }

    return (
        <div className="container">
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={handleRegister}
                        ref={(c) => {
                            setForm(c);
                        }}
                    >
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Name</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Color</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Description</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">No of available items</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={numberOfAvailableItems}
                                        onChange={(e) => setNumberOfAvailableItems(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Price</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Rank</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={rank}
                                        onChange={(e) => setRank(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Add</button>
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => setCheckBtn(c)}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default ProductAdd;