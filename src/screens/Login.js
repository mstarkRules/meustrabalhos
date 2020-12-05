import React from 'react';

import styled from 'styled-components/native';

import {connect} from 'react-redux';
import { editEmail } from '../actions/AuthActions';

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

const Pagina=(props)=>{
    return(
        <Page>
            <Input
                value={props.email}
                onChangeText={t=>props.editEmail(t)}
                autoFocus={true}
                autoCapitalize='words'
                
                placeholder='Digite seu email'
            />
            <Input
                value={props.senha}
                onChangeText={t=>props.editSenha(t)}
                autoFocus={false}
                autoCapitalize='words'
                
                placeholder='Digite sua senha'
            />
        </Page>
    )
}

Pagina.navigationOptions = ({navigation})=>{
    return{
        header:null
    }
}

const mapStateToProps=(state)=>{
    return{
        email:state.authReducer.email,
        senha:state.authReducer.senha
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        editEmail:(email)=>dispatch({type:'SET_EMAIL',payload:{email}}),
        editSenha:(senha)=>dispatch({type:'SET_SENHA', payload:{senha}}),
        addDisciplina:(disciplina)=>dispatch({type:'ADD_DISCIPLINAS', payload:{disciplina}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagina);

