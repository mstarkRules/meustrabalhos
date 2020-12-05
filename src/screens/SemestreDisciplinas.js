import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';

import {connect} from 'react-redux';

import * as TrabalhoActions from '../actions/TrabalhoActions';


import TrabalhoItem from '../components/TrabalhoItem';
import DisciplinaItem from '../components/DisciplinaItem';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    padding-top:10px;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const DisciplinasLista = styled.FlatList`
    flex:1;
    width:90%;
`;


const Pagina = (props)=>{

    const [disciplinasSemestre, setDisciplinasSemestre] = useState();

    //console.log(disciplinasSemestre);

    useEffect(()=>{
        preencherFiltro();
    },[]);

    const preencherFiltro=()=>{
        let filtro = [...props.disciplinas];
        
       filtro = filtro.filter((t)=>{
           return t.idSemestre === props.navigation.state.params.id
       })

       setDisciplinasSemestre(filtro);
        console.log(disciplinasSemestre);
    }

    return(
        <Page>

           <DisciplinasLista
                data={disciplinasSemestre}
                renderItem={ ({item})=> <DisciplinaItem
                    data={item}
                    navigation={props.navigation}
                /> }
           />
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:navigation.state.params.title,
        headerStyle:{
            backgroundColor:'#5f68ef'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:'bold',
            fontSize:20
        }   
    }
}



const mapStateToProps=(state)=>{
    return{
        trabalhos:state.userReducer.trabalhos,
        disciplinas:state.userReducer.disciplinas
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addTrabalho:(trabalho)=>dispatch(TrabalhoActions.addTrabalho(trabalho)),
        delTrabalho:(trabalho)=>dispatch(TrabalhoActions.delTrabalho(trabalho))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);