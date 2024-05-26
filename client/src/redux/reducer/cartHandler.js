const cartHandler = (state = [], action) => {
    const product = action.payload
    switch (action.type) {
        case "ADDITEM":
            // check if product is already exist
            const exist = state.find((x) => x._id === product._id)
            if (exist) {
                return state.map((x) => x._id === product._id ? { ...x, qty: x.qty + 1 } : x)
            } else {
                const product = action.payload
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1
                    }
                ]
            }
            break;
        case "DELITEM":
            const exit1 = state.find((x) => x._id === product._id);
            if (exit1.qty === 1) {
                return state.filter((x) => x._id !== exit1._id);
            }
            else {
                return state.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty - 1 } : x
                );
            }
            break;
        case "DELETE_PRODUCT_FROM_CART":
            // Filter out the product from the cart
            return state.filter((product) => product._id !== action.payload._id);

        case "CLEAR_CART":
            // Clear the cart by returning an empty array
            return [];
        default:
            return state
            break;
    }
}

export default cartHandler;