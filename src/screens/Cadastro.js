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
`;

const Cadastro=(props)=>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [name, setName] = useState('');

    const cadastrar=()=>{
        if(email.length >0 && senha.length > 0 && name.length >0){
            props.cadastrar(name, email, senha);
        }else{
            alert('Preencha todos os campos!');
        }
        
    }

    useEffect(()=>{
        if(props.status ===1){
            props.navigation.navigate('StarterIntro');
        }
    },[props.status])

    return(
        <Page>
            <Texto>Cadastre-se</Texto>
            <Input
                value={email}
                onChangeText={t=>setEmail(t)}
                autoFocus={true}
                autoCapitalize='words'
                
                placeholder='Digite seu email'
            />
            <Input
                value={senha}
                onChangeText={t=>setSenha(t)}
                autoFocus={false}
                secureTextEntry
                placeholder='Digite sua senha'
            />
            <Input
                value={name}
                onChangeText={t=>setName(t)}
                autoFocus={false}
                autoCapitalize='words'
                placeholder='Digite seu nome'
            />
            <Button onPress={cadastrar}>
                <Texto>Cadastrar</Texto>
            </Button>
        </Page>
    )
}

Cadastro.navigationOptions = ({navigation})=>{
    return{
        header:null
    }
}

const mapStateToProps=(state)=>{
    return{
        email:state.authReducer.email,
        senha:state.authReducer.senha,
        name:state.userReducer.name,
        uid:state.authReducer.uid,
        status:state.authReducer.status
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        editEmail:(email)=>dispatch({type:'SET_EMAIL',payload:{email}}),
        editSenha:(senha)=>dispatch({type:'SET_SENHA', payload:{senha}}),
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
        cadastrar:(name, email, senha)=>dispatch(AuthActions.cadastrar(name, email, senha))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);

