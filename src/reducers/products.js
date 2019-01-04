import * as Types from '../constants/ActionTypes'

var initialState = []

const products = (state = initialState, action) => {
    switch (action.type){
        case Types.FETCH_PRODUCT:
            state = action.products
            return [...state]
        case Types.DELETE_PRODUCT:
            let index = state.findIndex(product => {
                return product.id === action.id
            })
            if (index > -1){
                state.splice(index, 1)
            }
            return [...state]
        case Types.ADD_PRODUCT:
            state.push(action.product)
            return [...state]
        case Types.UPDATE_PRODUCT:
            index = state.findIndex(product => {
                return product.id === action.product.id
            })
            state[index] = action.product
            return [...state]
        default: return [...state]
    }
}

export default products