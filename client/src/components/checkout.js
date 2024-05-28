import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProductContext } from './common/api/provider';
import { orderServices } from '../services/orderServices';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const { addOrderURL } = useProductContext();
    const stateCart = useSelector((state) => state.cartHandler);
    const stateUser = useSelector((state) => state.userHandler);

    const[loading, setLoading] = useState(false)



    const navigate = useNavigate();
    const dispatch = useDispatch();

    const total = stateCart.reduce((acc, product) => acc + product.productPrice * product.qty, 0);

    const OrdersDetails = stateCart.map((product) => {
        return {
            name: product.productName,
            price: product.productPrice,
            quantity: product.qty,
        };
    });

    const initialOrderState = {
        billingAddress: {
            name: stateUser?.user?.name || '',
            email: stateUser?.user?.email || '',
            address: '',
            phoneNumber: stateUser?.user?.phone || '',
            country: '',
            zip: '',
        },
        payment: {
            nameOnCard: '',
            cardNumber: '',
            cvv: '',
            expiration: '',
        },
        cart: OrdersDetails,
        totalAmount: total,
        orderStatus: 'pending',
        customerId: stateUser?.user?._id || 0,
    };

    const [order, setOrder] = useState(initialOrderState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [parentKey, childKey] = name.split('.');
        setOrder((prevState) => ({
            ...prevState,
            [parentKey]: {
                ...prevState[parentKey],
                [childKey]: value,
            },
        }));
    };

    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await orderServices.postorder(addOrderURL, order);
            const { orderCode } = response;
            swal("Success", `Your Order is Placed. \nOrderCode: ${orderCode}`, "success");
            dispatch({ type: 'CLEAR_CART' });
            setOrder(initialOrderState);
            navigate('/');
            console.log('response in checkout', response);
            setLoading(false)
        } catch (error) {
            swal("error", "Error in Creating Order", "error"); // Show success message
            console.error('Error:', error);
            setLoading(false)
        }
    };

    return (
        <div className='container my-4'>
            <div className='row'>
                <div className="col-md-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" onSubmit={handleOrder}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.name">Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.name"
                                    name="billingAddress.name"
                                    placeholder="Enter Name"
                                    value={order.billingAddress.name}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.email">Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="billingAddress.email"
                                    name="billingAddress.email"
                                    placeholder="you@example.com"
                                    value={order.billingAddress.email}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="billingAddress.address">Address</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.address"
                                    name="billingAddress.address"
                                    placeholder="1234 Main St"
                                    required
                                    value={order.billingAddress.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.phoneNumber">Phone Number</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.phoneNumber"
                                    name="billingAddress.phoneNumber"
                                    placeholder="Phone Number"
                                    value={order.billingAddress.phoneNumber}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.country">Country</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.country"
                                    name="billingAddress.country"
                                    placeholder="Country"
                                    value={order.billingAddress.country}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="billingAddress.zip">Zip</label>
                                <input type="text"
                                    className="form-control"
                                    id="billingAddress.zip"
                                    name="billingAddress.zip"
                                    placeholder="Zip Code"
                                    value={order.billingAddress.zip}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <h4 className="mb-3">Payment</h4>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="payment.nameOnCard">Name on Card</label>
                                <input type="text"
                                    className="form-control"
                                    id="payment.nameOnCard"
                                    name="payment.nameOnCard"
                                    placeholder="Name on Card"
                                    value={order.payment.nameOnCard}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="payment.cardNumber">Card number</label>
                                <input type="text"
                                    className="form-control"
                                    id="payment.cardNumber"
                                    name="payment.cardNumber"
                                    placeholder="Card Number"
                                    value={order.payment.cardNumber}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="payment.expiration">Expiration</label>
                                <input type="text"
                                    className="form-control"
                                    id="payment.expiration"
                                    name="payment.expiration"
                                    placeholder="Expiry Date"
                                    value={order.payment.expiration}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="payment.cvv">CVV</label>
                                <input type="text"
                                    className="form-control"
                                    id="payment.cvv"
                                    name="payment.cvv"
                                    placeholder="CVV"
                                    value={order.payment.cvv}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
                            {loading ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :
                                'Place Order'
                            }
                        </button>
                    </form>
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
                            {stateCart.map((product, i) => {
                                const { productName, productPrice, qty } = product;
                                return (
                                    <tr key={i}>
                                        <td>{productName}</td>
                                        <td>{productPrice}</td>
                                        <td>{qty}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan='2' className='text-end'>Total</td>
                                <td className='text-center'>{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};