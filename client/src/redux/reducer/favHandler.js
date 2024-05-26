const favHandler = (state = [], action) => {
    const product = action.payload;
    // debugger
    switch (action.type) {
        case "ADDFAV":
            // Check if product is already in favorites
            const existsInFavorites = state.some((x) => x._id === product._id);

            if (existsInFavorites) {
                return state; // Product already in favorites, do nothing
            } else {
                // Add the product to favorites
                return [...state, product];
            }

        case "DELFAV":
            // Remove the product from favorites
            return state.filter((x) => x._id !== product._id);
        // Assuming you have an action type "REMOVE_FAV" for removing products from favorites
        case "REMOVE_FAV":
            return state.filter((x) => x._id !== product._id);

        case "CLEAR_FAV":
            // Clear the favorites by returning an empty array
            return [];

        default:
            return state;
    }
};

export default favHandler;