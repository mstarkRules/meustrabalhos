import React from 'react';
import  { Text } from 'react-native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

import {connect} from 'react-redux';



const Container = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#e9eff9;
`;

const ScrollPage = styled.ScrollView`
    
`;

const WelcomeText = styled.Text`
    font-size:21px;
    margin-top: 50px;
    color:#000333;
    font-weight: bold;
    text-align:center;
`;

const WelcomeImage = styled.View`
    flex:1;
    height:400;
    justify-content:center;
    align-items:center;
`;

const WelcomeLogo = styled.Image`
    width:300px;
    height:300px;
`;

const BeginConfigArea = styled.View`
  margin-bottom:50px;
  width:100%;
  justify-content:center;
  align-items:center;
`;

const Texto = styled.Text`
    color:#FFF;
    font-weight:bold;
    font-size:15px;
`;

const BtnIniciar = styled.TouchableOpacity`
    width:60%;
    height:50px;
    padding:5px;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    border-radius:5px;
`;





const Pagina=(props)=>{
    console.log('qw');

    const start=()=>{
        props.navigation.navigate('StarterName');
    }
    return(
        <Container>
            <ScrollPage showsVerticalScrollIndicator={false}>
                <WelcomeText>Bem Vindo(a) aos Meus Trabalhos</WelcomeText>
                <WelcomeImage>
                    <WelcomeLogo source={require('../assets/images/notebook2.png')}/>
                </WelcomeImage>
                <BeginConfigArea>
                    <BtnIniciar onPress={start} underlayColor='#CCC'>
                        <Texto>Configurações Iniciais</Texto>
                    </BtnIniciar>
                </BeginConfigArea>
            </ScrollPage>
           
        </Container>
    );
}

Pagina.navigationOptions={
    header:null
}


const mapStateToProps=(state)=>{
    return{
        name:state.userReducer.name
    };
}

export default connect(mapStateToProps)(Pagina);