import React, {useState, useEffect} from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ModalArea = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;
const ModalBox = styled.View`
    width:70%;
    padding:5px;
    justify-content:flex-start;
    align-items:center;
    background-color:#fff;
    border-radius:5px;
`;

const HeaderArea = styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;
const ModalClose = styled.TouchableOpacity`
    height:40px;
    width:40px;
    align-items: center;
    justify-content:center;
    border-radius:20px;

`;

const CloseText = styled.Text`
    font-size:26px;
`;

const ModalBody = styled.View`
    width:100%;
    justify-content:center;
    align-items:center;
`;

const Texto = styled.Text`
    font-size:18px;
    font-weight:bold;
`;

const TitleText = styled.Text`
    font-size:20px;
    font-weight:bold;
    margin-left:15px;
`;

const InputGotPontuacao = styled.TextInput`
    width:100px;;
    height:50px;
    background-color:#FFF;
    font-size:28px;
`;

const Button = styled.TouchableHighlight`
    width:100%;
    height:auto;
    justify-content:center;
    align-items:center;
    padding:10px;
    border-top-color:#999;
    border-top-width:1px;
`;


export default(props)=>{
    const [listaGraus, setListaGraus] = useState();
    const [gotPontuacao, setGotPontuacao] = useState(0);
    /*
    const selecionouDisciplina=(item)=>{
        alert('selecionou a disciplina '+ item.name )
        props.selecionouAction();
    }
    */

    const setGotPontuacaoTrabalho=(gotPontuacao)=>{
       // alert(gotPontuacao);
        props.setGotPontuacaoAction(gotPontuacao);
    }



    return(
        <Modal animationType='slide' visible={props.visible} transparent={true} animationType='fade'>
            <ModalArea>
                <ModalBox>
                    <HeaderArea>
                        <TitleText>Qual foi a pontuação?</TitleText>
                        <ModalClose onPress={props.closeAction} underlayColor='#c6c6c6'>
                            <FontAwesomeIcon name='close' size={35}/>
                        </ModalClose>
                    </HeaderArea>
                    
                    <ModalBody>
                        <InputGotPontuacao
                            value={gotPontuacao}
                            onChangeText={t=>setGotPontuacao(parseFloat(t))}
                            keyboardType='numeric'
                            maxLength={3}
                            autoFocus={true}
                            onSubmitEditing={()=>setGotPontuacaoTrabalho(gotPontuacao)}
                        />
                        <Button underlayColor='#ccc' onPress={()=>setGotPontuacaoTrabalho(gotPontuacao)}>
                            <Texto>Confirmar</Texto>
                        </Button>
                    </ModalBody>
                </ModalBox>
            </ModalArea>
        </Modal>
    );
}
