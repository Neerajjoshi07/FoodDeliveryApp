import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modals';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { Collapse } from 'react-bootstrap';
export default function Navbar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    

        let data = useCart();
        const [cartView, setCartView] = useState(false)
        const navigate = useNavigate();
        const handleLogout = () => {
            localStorage.removeItem("authToken");
            navigate("/login")
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-info">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-1" to="/">TheFoodHub</Link>
                        <button className="navbar-toggler" type="button" aria-controls="navbarNav" aria-expanded={isCollapsed ? 'true' : 'false'} aria-label="Toggle navigation" onClick={toggleCollapse}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Collapse in={isCollapsed}>
                        <div className="navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2">
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                                </li>

                                {(localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">MyOrders</Link>
                                    </li>
                                    : ""}

                            </ul>
                            {(!localStorage.getItem("authToken")) ?
                                <div className="d-flex " >

                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>

                                </div>
                                :
                                <div>
                                    <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                                        My Cart{" "}
                                        <Badge pill bg="danger">{data.length}</Badge>
                                    </div>

                                    {cartView ? <Modal onClose={() => setCartView(false)}>  <Cart /> </Modal> : null}

                                    <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
                                </div>
                            }
                        </div>
                        </Collapse>
                    </div>
                </nav>

            </div>
        )
    }
