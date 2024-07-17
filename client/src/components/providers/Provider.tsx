'use client';

import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

interface AppState {
    series: string[];
    history: string[][];
}

const initialState: AppState = {
    series: [],
    history: [],
};

type Action = { type: 'SET_SERIES'; payload: string[] };

const AppContext = createContext<{
    state: AppState;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'SET_SERIES':
            return {
                ...state,
                series: action.payload,
                history: [...state.history, action.payload],
            };
        default:
            return state;
    }
};

interface AppProviderProps {
    children: ReactNode;
}

export const Provider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
