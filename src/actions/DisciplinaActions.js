export const addDisciplina=(disciplina)=>{
    return{
        type:'ADD_DISCIPLINA',
        payload: {
            disciplina
        }
    };
}

export const setActiveDisciplina=(disciplina)=>{
    return{
        type:'SET_ACTIVE_DISCIPLINA',
        payload:{
            disciplina
        }
    };
}

export const setNotaGrauI=(id, notaG1)=>{
    return{
        type:'SET_NOTA_GRAU_I',
        payload:{
            id,
            notaG1
        }
    };
}

export const setNotaGrauII=(id, notaG2)=>{
    return{
        type:'SET_NOTA_GRAU_II',
        payload:{
            id,
            notaG2
        }
    };
}

export const setNotaFinalDisciplina=(id, notaFinal)=>{
    return{
        type:'SET_NOTA_FINAL_DISCIPLINA',
        payload:{
            id,
            notaFinal
        }
    };
}