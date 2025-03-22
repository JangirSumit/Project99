const defaultProfile = {
    name: "",
    userName: "",
    role: 0,
    costomerId: 0
}

const GlobalReducer = (state, action) => {
    switch (action.type) {
        case "logout":
            localStorage.removeItem("authToken");
            return {
                ...state,
                profile: {
                    ...defaultProfile
                },
                isAuthenticated: false,
            };
        case "setProfile":
            return {
                ...state,
                isAuthenticated: true,
                profile: {
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default GlobalReducer;