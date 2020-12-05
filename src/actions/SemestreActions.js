export const addSemestre=(semestre)=>{
    return{
        type:'ADD_SEMESTRE',
        payload: {
            semestre
        }
    };
}

export const setActiveSemestre=(semestre)=>{
    return{
        type:'SET_ACTIVE_SEMESTRE',
        payload:{
            semestre
        }
    };
}