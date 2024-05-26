import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, delCart, delProductCart } from '../redux/action';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const stateCart = useSelector((state) => state.cartHandler);

    const dispatch = useDispatch()

    const handleClose = (e) => dispatch(delProductCart(e))
    const handleAdd = (e) => dispatch(addCart(e))
    const handleDel = (e) => dispatch(delCart(e))

    // Calculate total amount using only newPrice
    const totalAmount = stateCart.reduce((total, product) => {
        const price = product.pPrice || 0; // Use newPrice, default to 0 if not available
        const quantity = product.qty || 0;

        return total + price * quantity;
    }, 0);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stateCart.map((e) => {
                                return (
                                    <tr>
                                        <th scope="row">{e._id}</th>
                                        <td>{e.pCategory}</td>
                                        <td>{e.pName}</td>
                                        <td>{e.pPrice}</td>
                                        <td>
                                            <div className="input-group" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDel(e)}>-</button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm text-center border-0" value={e.qty} />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleAdd(e)}>+</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{e.qty * e.pPrice}</td>
                                        <td valign='middle'>
                                            <button className="btn btn-outline-primary" onClick={() => handleClose(e)}>Del</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan='4' className='text-end'>Total</td>
                                <td colSpan='3' className='text-center'>{totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-md-12'>
                    <Link className='btn btn-primary' to='/checkout'>Checkout</Link>
                </div>
            </div>
        </div>
    )
}
