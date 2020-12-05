import React,{ useState, useEffect } from 'react';

import styled from 'styled-components/native';
import firebase from 'firebase';

import {connect} from 'react-redux';
import * as AuthActions from '../actions/AuthActions';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const Input = styled.TextInput`
    border:1px solid #CCC;
    width:90%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
    margin:10px;
`;

const Button = styled.TouchableOpacity`
    width:70%;
    height:auto;
    padding:10px;
    background-color:#ccc;
    justify-content:center;
    align-items:center;
    margin:10px;
`;

const Welcome=(props)=>{


    const cadastrar=()=>{
        props.navigation.navigate('Cadastro');
    }

    const entrar=()=>{
        props.navigation.navigate('Login');
    }

    return(
        <Page>
            <Texto>Bem vindo ao Meus Trabalhos</Texto>

            <Button onPress={entrar}>
                <Texto>
                     Entrar
                </Texto>
            </Button>
            <Button onPress={cadastrar}>
                <Texto>
                    Cadastrar-se
                </Texto>
            </Button>
        </Page>
    )
}

Welcome.navigationOptions = ({navigation})=>{
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
        cadastrar:(name, email, senha)=>dispatch(AuthActions.cadastrar(name, email, senha))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

