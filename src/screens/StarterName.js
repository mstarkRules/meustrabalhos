import React, {useEffect} from 'react';
import  { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

import * as SemestreActions from '../actions/SemestreActions';

import {connect} from 'react-redux';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#e9eff9;

`;


const Texto = styled.Text`
    font-weight:bold;
    font-size:15px;
`;

const HeaderText = styled.Text`
    margin-top:40;
    margin-bottom:40px;
    font-size:22px;
    color:#000333;


`;

const NameInput = styled.TextInput`
    
    border:1px solid #CCC;
    width:90%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;

const ButtonText = styled.Text`
    color:#FFF;
`;

const BtnIniciar = styled.TouchableOpacity`
    margin-top:10px;
    width:70%;
    height:50px;
    padding:5px;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    border-radius:5px;
`;




const Pagina=(props)=>{


    const now = new Date;
    useEffect(()=>{
        addSemestre();
    },[]);

    getSemestre=()=>{
        return now.getFullYear()+`${(now.getMonth()>5?'/02':'01')}`;
    }

    const addSemestre=()=>{
        let item = {
            id:getSemestre(),
            isActive:true
        }
        props.addSemestre(item);
        console.log(props.semestres);
    }

    const nextAction=()=>{
        if(!props.name){
            alert('Digite um nome!')
            return
        }
        props.navigation.navigate('StarterDisciplinas');
    }
  
    return(
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={t=>props.setName(t)}
                autoFocus={true}
                autoCapitalize='words'
                onSubmitEditing={nextAction}
                placeholder='Digite seu nome'
            />
            <BtnIniciar  onPress={nextAction} underlayColor='#CCC'>
                <ButtonText>Próximo</ButtonText>
            </BtnIniciar>

          
        </Container>
    );
}

Pagina.navigationOptions=({navigation}) =>{
    return{
        header:null
    }
}


const mapStateToProps=(state)=>{
    return{
        name:state.userReducer.name
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setName:(name)=>dispatch({type:'SET_NAME',payload:{name}}),
        addSemestre:(semestre)=>dispatch(SemestreActions.addSemestre(semestre))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagina);