const initialState = {
    email:'',
    senha:''
    

};

export default(state = [], action)=>{
    if (state.length == 0 ){
        return initialState;
    }
    switch(action.type){
        case 'SET_EMAIL':
            return {...state, email:action.payload.email};
            break;
        case 'SET_SENHA':
            return {...state, senha:action.payload.senha};
    }


    return state;
} 