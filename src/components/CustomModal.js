import React, {useState, useEffect} from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
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
    background-color:#DDD;
    border-radius:2px;
`;

const HeaderArea = styled.View`
    width:100%;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;
const ModalClose = styled.TouchableHighlight`
    align-self: flex-end;
    justify-content:flex-end;
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
`;

const TitleText = styled.Text`
    font-size:20px;
    font-weight:bold;
    margin-left:15px;
`;

const DisciplinaLista = styled.FlatList`
    width:100%;
    margin-top:10px;
    margin-bottom:20px;
`;

const DisciplinaItemSelect = styled.TouchableHighlight`
    height:50;
    width:100%;
    justify-content:center;
    align-items:flex-start;
    padding:20px;
    
`;


const CustomModal=(props)=>{
    const [listaDisciplinas, setListaDisciplinas] = useState();

    /*
    const selecionouDisciplina=(item)=>{
        alert('selecionou a disciplina '+ item.name )
        props.selecionouAction();
    }
    */

    useEffect(()=>{
        preencherFiltro();
    },[]);

    const preencherFiltro=()=>{
        let filtro = [...props.disciplinas];
        
        filtro = filtro.filter((t)=>t.isActive===true);
        setListaDisciplinas(filtro);
    
}

    return(
        <Modal animationType='slide' visible={props.visible} transparent={true} animationType='fade'>
            <ModalArea>
                <ModalBox>
                    <HeaderArea>
                        <TitleText>Disciplinas</TitleText>
                        <ModalClose onPress={props.closeAction}>
                            <CloseText> X </CloseText>
                        </ModalClose>
                    </HeaderArea>
                    
                    <ModalBody>
                        <DisciplinaLista
                            data={listaDisciplinas}
                            renderItem={({item})=>
                            <DisciplinaItemSelect onPress={()=>props.selecionouAction(item)} underlayColor='#c6c6c6'>
                                <Texto>{item.name}</Texto>
                            </DisciplinaItemSelect>
                        }
                        />
                        {props.children}
                    </ModalBody>
                </ModalBox>
            </ModalArea>
        </Modal>
    );
}

const mapStateToProps=(state)=>{
    return{
        disciplinas:state.userReducer.disciplinas
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);