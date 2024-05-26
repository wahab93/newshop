import React from 'react'
import { useSelector } from 'react-redux';

export const Checkout = () => {
    const stateCart = useSelector((state) => state.cartHandler);

    // Calculate total amount using only newPrice
    const totalAmount = stateCart.reduce((total, product) => {
        const price = product.pPrice || 0; // Use newPrice, default to 0 if not available
        const quantity = product.qty || 0;

        return total + price * quantity;
    }, 0);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <h1>Checkout</h1>
                </div>
                <div className='col-md-4'>
                    <h1>Cart</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stateCart.map((product ,i) => {
                                const { pName,pPrice, qty} = product
                                return (
                                    <tr key={i}>
                                        <td>{pName}</td>
                                        <td>{pPrice}</td>
                                        <td>{qty}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan='2' className='text-end'>Total</td>
                                <td colSpan='2' className='text-center'>{totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
