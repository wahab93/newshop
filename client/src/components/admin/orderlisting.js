import React, { useState, useEffect, useMemo } from 'react'
import { useProductContext } from '../common/api/provider';
import { orderServices } from '../../services/orderServices';

export const Orderlisting = () => {
    const { getAllOrdersURL, updateOrderURL } = useProductContext();
    const [orders, setOrders] = useState([])
    const [filterCode, setFilterCode] = useState('');


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await orderServices.getAllOrder(getAllOrdersURL);
                setOrders(res.reverse());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])


    const updateOrderStatus = async (orderId, status) => {
        try {
            // debugger
            const updatedOrder = await orderServices.updateOrderStatus(updateOrderURL, orderId, status);
            console.log('updatedOrder', updatedOrder)
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: status } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) =>
            order.orderCode.toLowerCase().includes(filterCode.toLowerCase())
        );
    }, [orders, filterCode]);
    

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Order Listing</h1>
                    <input type='text' placeholder='Enter Order Code' className='form-control' value={filterCode} onChange={(e) => setFilterCode(e.target.value)} />
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>Order Date</th>
                                <th>Customer Name</th>
                                <th>Order Code</th>
                                <th>Order Total</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredOrders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.createdAt}</td>
                                            <td>{order.billingAddress.name}</td>
                                            <td>{order.orderCode}</td>
                                            <td>{order.orderStatus}</td>
                                            <td>{order.totalAmount}</td>

                                            {order.orderStatus !== 'completed' ? (
                                                <td>
                                                    <select
                                                        className='form-select'
                                                        value={order.orderStatus}
                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="dispatching">Dispatching</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </td>
                                            ) : (
                                                <td>Completed</td>
                                            )}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
