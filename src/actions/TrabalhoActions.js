export const addTrabalho=(trabalho)=>{
    return{
        type:'ADD_TRABALHO',
        payload: {
            trabalho
        }
    };
}

export const delTrabalho=(trabalho)=>{
    return{
        type:'DEL_TRABALHO',
        payload:{
            trabalho
        }
    };
}

export const toggleTrabalho=(id)=>{
    return{
        type:'TOGGLE_TRABALHO',
        payload:{
            id
        }
    };
}

export const setGotPontuacaoTrabalho=(gotPontuacao, id)=>{
    return{
        type:'SET_GOT_PONTUACAO',
        payload:{
            gotPontuacao,
            id
        }
    };
}