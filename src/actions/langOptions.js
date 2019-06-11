export const changeLang = (option)=> (dispatch) => {
    dispatch({type : 'langOptions',
    payload : option})
}