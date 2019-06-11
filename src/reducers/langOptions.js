const initialState={option:{}}

export default function(state=initialState, action){
    switch (action.type) {
        case 'langOptions':
            return {
                ...state,
                option:action.payload
            }
        default:
            return state
    }
}