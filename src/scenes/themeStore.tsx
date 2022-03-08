import React, {createContext, useContext, useReducer} from 'react';

const initialState = {
    theme: 'green',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeTheme':
        return {
            ...state,
            theme: action.newTheme
        };
        default:
        return state;
    }
};

const ThemeContext = createContext();

const ThemeConsumer = ThemeContext.Consumer;
const ThemeConsumerHook = () => useContext(ThemeContext);

const ThemeProvider = ({children}) => (
    <ThemeContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </ThemeContext.Provider>
);

export {
    ThemeConsumer,
    ThemeConsumerHook,
    ThemeProvider,
}