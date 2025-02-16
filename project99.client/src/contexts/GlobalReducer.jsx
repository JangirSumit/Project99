const defaultAccessToken = {
    token: "",
    expirationTime: new Date(),
    role: 0
}

const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                accessToken: { ...action.payload },
                isAuthenticated: true,
            };
        case "logout":
            return {
                ...state,
                accessToken: {
                    ...defaultAccessToken
                },
                isAuthenticated: false,
            }
        default:
            return state;
    }
}

export default GlobalReducer;