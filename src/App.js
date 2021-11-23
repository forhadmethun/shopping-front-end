import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Route, Router, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/user/profile.component";
import {logout} from "./actions/auth";
import {clearMessage} from "./actions/message";
import {history} from './helpers/history';
import EventBus from "./common/EventBus";
import ProductAdd from "./components/product/product-add.component";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.auth?.user);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const logOut = () => {
        dispatch(logout());
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    }

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user?.roles?.includes("ROLE_ADMIN"));
        }
    }, [user]);

    useEffect(() => {
        EventBus.on("logout", logOut);
        return () => {
            EventBus.remove("logout");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Shopping
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showAdminBoard && (
                            <>
                                <li className="nav-item">
                                    <Link to={"/product/add"} className="nav-link">
                                        Add product
                                    </Link>
                                </li>
                            </>
                        )}

                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/product/add" component={ProductAdd}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );

}

export default App;
