import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { accountServices } from '../services/accountService';
import { useProductContext } from './common/api/provider';
export const Navbar = () => {
    const { logoutURL } = useProductContext();
    const stateUser = useSelector((state) => state.userHandler.user);
    const stateAdmin = useSelector((state) => state.userHandler.isAdmin);
    const stateCart = useSelector((state) => state.cartHandler);
    // const stateCartfav = useSelector((state) => state.favHandler);
    // console.log(stateCartfav)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // for admin logout
    const logOut = async () => {
        try {
            await accountServices.logout(logoutURL);
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
            swal('success', 'Logged Out', 'success');
        } catch (error) {
            swal('Error!', 'Logout Error', 'error');
            console.error('Logout Error:', error);
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            {stateAdmin &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/addproduct">Add Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/orderlisting">Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/categoryListing">Add Category</Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart ({stateCart.length})</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="#">Fav ({stateCartfav.length})</Link>
                            </li> */}
                            {stateUser ?
                                <li className="nav-item" onClick={logOut}>
                                    <Link className="nav-link" to="#">Logout</Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
