const swapAndEditBoard = store => next => action => {
    const func = (action) => {
        const state = store.getState()

        const asArray = Object.entries(state.board)
        const swapElements = (array, index1, index2) => {
            [array[index1 - 1], array[index2 - 1]] = [array[index2 - 1], array[index1 - 1]];
        };
        
        try {
            swapElements(asArray, state.oldSquare, state.newSquare)
            asArray[state.oldSquare - 1][1] = state.oldSquare
            asArray[state.newSquare - 1][1] = state.newSquare
            const swapped = Object.fromEntries(asArray)
            return {
                ...action,
                payload: swapped
            }
        } catch (error) {
        }
    }

    if (action.type.length < 7) {
        return next(func(action))
    } else {
        return next(action)
    }
}

export default swapAndEditBoard