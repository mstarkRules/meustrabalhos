import React, {useState} from 'react';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import DisciplinaItem from '../components/DisciplinaItem';
import SemestreItem from '../components/SemestreItem';

import * as SemestreActions from '../actions/SemestreActions';
import * as DisciplinaActions from '../actions/DisciplinaActions';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    align-content:center;
    padding-top:10;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const SemestreLista = styled.FlatList`
    flex:1;
    width:90%;
`;



const BtnAddSemestre = styled.TouchableOpacity`
    height:70px;
    width:70px;
    border-radius:35;
    position:absolute;
    top:75%;
    right:5%;
    z-index:0;
    background-color:#0a9830;
    justify-content:center;
    align-items:center;
`;

const Pagina = (props)=>{
  
    
    const activeSemestre = [...props.semestres];
    const now = new Date;
    getSemestre=()=>{
        return now.getFullYear()+`${(now.getMonth()>5?'/02':'01')}`;
    }

    getProximoSemestre=()=>{
        return activeSemestre[0].id[6]==='2'?now.getFullYear()+1+'/01':now.getFullYear()+'/02';
    }

    const desativarSemestre=()=>{
        let filtro = [...props.semestres];
        filtro = filtro.filter((t)=>{
            if(t.isActive === true){
                props.setActiveSemestre(t);
            }
        })        
    }

    const desativarDisciplina=()=>{
        let filtro = [...props.disciplinas];
        filtro = filtro.filter((t)=>{
            if(t.isActive === true){
                props.setActiveDisciplina(t);
            }
        })        
    }
    
    const addSemestre=()=>{
        desativarSemestre();
        desativarDisciplina();
        let item = {
            id:getProximoSemestre(),
            isActive:true
        }
        props.addSemestre(item);
    
        props.navigation.navigate('StarterDisciplinas');
        console.log(props.semestres);
       // console.log(props.disciplinas);
    }

    return(
        <Page>
            <SemestreLista
                data={props.semestres}
                renderItem={({item})=> <SemestreItem
                    data={item}
                    navigation={props.navigation}
                />}
            />

            <BtnAddSemestre onPress={addSemestre}>
                <Icon name="calendar" size={30} color="#DDD"/>
            </BtnAddSemestre>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Semestres',
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
        disciplinas:state.userReducer.disciplinas,
        semestres:state.userReducer.semestres
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addSemestre:(semestre)=>dispatch(SemestreActions.addSemestre(semestre)),        
        setActiveSemestre:(semestre)=>dispatch(SemestreActions.setActiveSemestre(semestre)),
        setActiveDisciplina:(disciplina)=>dispatch(DisciplinaActions.setActiveDisciplina(disciplina))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);