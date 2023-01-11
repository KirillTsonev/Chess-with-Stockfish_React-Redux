const swapAndEditBoard = store => next => action => {
    const func = (action) => {
        const board = store.getState().board
        const oldSquare = store.getState().oldSquare
        const newSquare = store.getState().newSquare

        const asArray = Object.entries(board)
        console.log(asArray)
        const swapElements = (array, index1, index2) => {  
            [array[index1 - 1][0], array[index2 - 1][0]] = [array[index2 - 1][0], array[index1 - 1][0]]
        }
        try {
            swapElements(asArray, oldSquare, newSquare)
            asArray[oldSquare - 1][2] = oldSquare
            asArray[newSquare - 1][2] = newSquare
            if (action.payload === "takes") {
                asArray[oldSquare - 1][0] = `empty${Object.keys(board).filter(a => /empty/.test(a)).length + 1}`
            }
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

const checkPieceMoved = store => next => action => {
    const func = (action) => {
        const pawnsFirstMove = store.getState().pawnsFirstMove
        const string = action.payload
        const reg = new RegExp(string)
        const asArray = Object.entries(pawnsFirstMove)
        const filteredPawn = asArray.filter(([key, value]) => reg.test(key))
        const restArr = asArray.filter(([key, value]) => !reg.test(key))
        filteredPawn[0][1] = false
        const changedObject = Object.fromEntries(restArr.concat(filteredPawn))

        return {
            ...action,
            payload: changedObject
        }
    }

    if (action.type === "pawnMoved") {
        return next(func(action))
    } else {
        return next(action)
    }
}

const checkCastlingMoved = store => next => action => {
    const func = (action) => {
        const castlingPlayerMoved = store.getState().castlingPlayerMoved
        const string = action.payload
        const reg = new RegExp(string)
        const asArray = Object.entries(castlingPlayerMoved)
        const filteredCastling = asArray.filter(([key, value]) => reg.test(key))
        const restArr = asArray.filter(([key, value]) => !reg.test(key))
        filteredCastling[0][1] = false
        const changedObject = Object.fromEntries(restArr.concat(filteredCastling))

        return {
            ...action,
            payload: changedObject
        }
    }

    if (action.type === "castlingPlayerMoved") {
        return next(func(action))
    } else {
        return next(action)
    }
}

export {swapAndEditBoard, checkPieceMoved, checkCastlingMoved}