import React, { createContext, useReducer, useContext } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, img: action.img, price: action.price }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state];

            arr.forEach(function (food, index) {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
                }
            });
            return arr

        case "DROP":
            let empArray = []

            return empArray

        default:
            console.log("Error In Reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

