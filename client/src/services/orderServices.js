// import { apiHelper } from "../helper/apiHelper";

// export const orderServices = {
//     getAllOrder: (apiOrder) => apiHelper.get(apiOrder),
//     postorder: (postOrder, order) => apiHelper.post(postOrder, { ...order }),
//     filterOrders: (orderFilter, filters) => {
//         const url = `${orderFilter}${filters.orderCode}&FromDate=${filters.fromDate}&ToDate=${filters.toDate}`;
//         return apiHelper.get(url);
//     }
// };


import { apiHelper } from "../helper/apiHelper";


export const orderServices = {
    postorder,
    getAllOrder,
    updateOrderStatus,
    // filterOrders
}


function getAllOrder(addOrderURL) {
    return apiHelper.get(addOrderURL);
}
function updateOrderStatus(url, orderId, status) {
    return apiHelper.put(`${url}/${orderId}/status`, { status })
        .then(response => response)
        .catch(error => {
            console.error('Error updating order status in Services:', error);
            throw error;
        });
}

function postorder(addOrderURL, order) {
    return apiHelper.post(addOrderURL, {
        billingAddress: {
            name: order.billingAddress.name,
            email: order.billingAddress.email,
            address: order.billingAddress.address,
            phoneNumber: order.billingAddress.phoneNumber,
            country: order.billingAddress.country,
            zip: order.billingAddress.zip,
        },
        payment: {
            nameOnCard: order.payment.nameOnCard,
            cardNumber: order.payment.cardNumber,
            expiration: order.payment.expiration,
            cvv: order.payment.cvv,
        },
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        cart: order.cart,
        customerId: order.customerId,
    }).then(order => {
        return order;
    });
}
