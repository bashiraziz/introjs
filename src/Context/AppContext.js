import React, { useReducer } from 'react';
import { v4 as uuidv4 } from "uuid";
const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();


function appReducer(state, action) {
    let newstate = {};
    switch (action.type) {
        case 'ADD_MAIN_TACCOUNT':
            newstate = {
                ...state,
                mainTaccount: [
                    ...state.mainTaccount,
                    {
                        id: uuidv4(),
                        title: '',
                        entryCr: [
                            {
                                id: uuidv4(),
                                label: '',
                                amountCredit: null,
                            },
                        ],
                        entryDr: [
                            {
                                id: uuidv4(),
                                label: '',
                                amountDebet: null,
                            },
                        ],
                        totalCr: null,
                        totalDr: null,
                        balanceDr: null,
                        balanceCr: null
                    }
                ]
            }

            return newstate;
        case 'ADD_ENTRY_DR':
               
            newstate = {
                ...state,
                mainTaccount:[...action.payload]
            }
            return newstate;

        case 'ADD_ENTRY_CR':
               
            newstate = {
                ...state,
                mainTaccount:[...action.payload]
            }
            return newstate;
       
        case 'CHANGE_DR':
            console.log('hello')
            newstate = {
                ...state,
                mainTaccount:[...action.payload]
            }
            return newstate;
           



        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}
function AppProvider({ children }) {

    let initialState = {
        mainTaccount: [
            {
                id: uuidv4(),
                title: '',
                entryCr: [
                    {
                        id: uuidv4(),
                        label: '',
                        amountCredit: null,
                    },
                ],
                entryDr: [
                    {
                        id: uuidv4(),
                        label: '',
                        amountDebet: null,
                    },
                ],
                totalCr: null,
                totalDr: null,
                balanceDr: null,
                balanceCr: null
            }
        ]



    }
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={{ dispatch }}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}
function useAppState() {
    const context = React.useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppProvider');
    }
    return context;
}
function useAppDispatch() {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within a AppProvider');
    }
    return context;
}
export { AppProvider, useAppState, useAppDispatch };