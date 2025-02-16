const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
}

export default GlobalReducer;