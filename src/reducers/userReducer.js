const initialState = {
    name:'',
    trabalhos:[],
    disciplinas:[],
    semestres:[],
    graus:[
        {
            id:'1',
            name:'Grau I'
        },
        {
            id:'2',
            name:'Grau II'
        }
    ],
    isLogged:null,
    notes:[]

};

export default (state = initialState, action)=>{
   
    let disciplinas = [...state.disciplinas];
    
    let trabalhos = [...state.trabalhos];

    let semestres = [...state.semestres];

    let graus = [...state.graus];

    let notes = [...state.notes];

    switch(action.type){
        case 'SET_NAME':
            return {...state, name:action.payload.name};
            break;
        case 'ADD_DISCIPLINA':
            disciplinas.unshift(action.payload.disciplina);
            return {...state, disciplinas};
            break;
        case 'ADD_TRABALHO':
            trabalhos.unshift(action.payload.trabalho);
            return {...state, trabalhos};
            break;
        case 'DEL_TRABALHO':
            trabalhos = trabalhos.filter(i=>i.id != action.payload.trabalho.id); 
            return {...state, trabalhos};
            break;
        case 'TOGGLE_TRABALHO':
            trabalhos.map(t=>(t.id != action.payload.id ? t: t.done = !t.done));
            return{...state, trabalhos};
            break;
        case 'SET_GOT_PONTUACAO':
            trabalhos.map(t=>(t.id!= action.payload.id ? t: t.gotPontuacao = action.payload.gotPontuacao));
            return {...state, trabalhos};
            break;
        case 'SET_NOTA_GRAU_I':
            disciplinas.map(t=>(t.id != action.payload.id ? t : t.notaG1 = action.payload.notaG1));
            return {...state, disciplinas};
            break;
        case 'SET_NOTA_GRAU_II':
            disciplinas.map(t=>(t.id != action.payload.id ? t : t.notaG2 = action.payload.notaG2));
            return {...state, disciplinas};
            break;
        case 'SET_NOTA_FINAL_DISCIPLINA':
            disciplinas.map(t=>(t.id != action.payload.id ? t: t.notaFinal = action.payload.notaFinal));
            return {...state, disciplinas};
            break;
        case 'ADD_SEMESTRE':
                if(semestres.findIndex(i=>i.id==action.payload.semestre.id) < 0){
                    semestres.unshift(action.payload.semestre);
                }
            return {...state, semestres};
            break;
        case 'SET_ACTIVE_SEMESTRE':
            semestres.map(t=>(t.id != action.payload.semestre.id ? t: t.isActive = false));
            return {...state, semestres};
            break;
        case 'SET_ACTIVE_DISCIPLINA':
            disciplinas.map(t=>(t.id != action.payload.disciplina.id ? t: t.isActive = false));
            return {...state, disciplinas};
            break;
        case 'ADD_NOTE':
            notes.unshift(action.payload.note);
            return {...state, notes};
            break;
        case 'DEL_NOTE':
            notes = notes.filter(i=>i.id != action.payload.id); 
            return {...state, notes};
            break;
    }
    return state;
} 