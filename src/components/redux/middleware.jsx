const swapAndEditBoard = store => next => action => {
    const func = (action) => {
        const board = store.getState().board
        const oldSquare = store.getState().oldSquare
        const newSquare = store.getState().newSquare

        const asArray = Object.entries(board)
        const swapElements = (array, index1, index2) => {
            [array[index1 - 1], array[index2 - 1]] = [array[index2 - 1], array[index1 - 1]]
        }
        
        try {
            swapElements(asArray, oldSquare, newSquare)
            asArray[oldSquare - 1][1] = oldSquare
            asArray[newSquare - 1][1] = newSquare
            const swapped = Object.fromEntries(asArray)
            return {
                ...action,
                payload: swapped
            }
        } catch (error) {
        }
    }

    if (action.type.length < 5) {
        return next(func(action))
    } else {
        return next(action)
    }
}

export {swapAndEditBoard}