import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import styled from 'styled-components/native';

import CustomModal from '../components/CustomModal';
import CustomModalGrau from '../components/CustomModalGrau';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as TrabalhoActions from '../actions/TrabalhoActions';

import {connect} from 'react-redux';


const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#f6f6f6;
`;

const ScrollPage = styled.ScrollView`
    width:100%;
`;

const Texto = styled.Text`
    font-size:23px;
    color:#f5effa;

`;
const TextSelects = styled.Text`
    font-size:23px;
    font-weight:bold;
`;

const TextDate = styled.Text`
    font-size:22px;
`;

const Input = styled.TextInput`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;
const InputTitle = styled.TextInput`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;

const InputDesc = styled.TextInput`
    height:{};
    width:80%;
    padding:5px;
    font-size:20px;
    border-bottom-width:1px;
    border-color:#666;
`;

const SelectDisciplina = styled.TouchableHighlight`
    margin-top:5px;
    border-bottom-width: 1px;
    height:auto;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;

const SelectGrau = styled.TouchableHighlight`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;

const SelectDate = styled.TouchableHighlight`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;


const Button = styled.TouchableHighlight`
    position:absolute;
    top:90%;
    z-index:0;
    background-color:#5f68ef;
    width:100%;
    justify-content:center;
    align-items:center;
    padding:10px;

`;

const ViewAreaItem = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
`;


const Pagina = (props)=>{
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [gotPontuacao, setGotPontuacao] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [idDiscipline, setIdDiscipline] = useState('');
    const [grau, setGrau] = useState('');
    const [idGrau, setIdGrau] = useState('');
    const [description, setDescription] = useState('');
    const [dataEntrega, setDataEntrega] = useState();
    const [dataSemanal, setDataSemanal] = useState();

    const [modalDisciplineVisible, setModalDisciplineVisible] = useState(false);
    const [modalGrauVisible, setModalGrauVisible] = useState(false);
    const [pickerDateVisible, setPickerDateVisible] = useState(false);

    const [tamanhoInput, setTamanhoInput] = useState(70);

    let trabalhos = [...props.trabalhos];
    let disciplinas =[...props.disciplinas];

    useEffect(()=>{
        selecionarData();
    },[]);
    
    const selecionarData = ()=>{
        const now = new Date;
        let data = now.getDate()+'/'+parseInt(now.getMonth()+1)+'/'+now.getFullYear();
        setDataEntrega(data);
    }

    const handleConfirmDate = (date)=>{
        setPickerDateVisible(false);
        setDataEntrega(moment(date).format('DD/MM/YYYY'));
    }

    const hideDatePicker = ()=>{
        setPickerDateVisible(false);
    }

    const selecionouGrau =(item)=>{
        setGrau(item.name);
        setIdGrau(item.id);
        setModalGrauVisible(false);
    }

    const selecionouDisciplina=(item)=>{
        setDiscipline(item.name);
        setIdDiscipline(item.id);
        setModalDisciplineVisible(false);
    }

    const somaPontuacaoPretendida=(idDiscipline, idGrau)=>{
        let sum = 0;
        const listaTrabalhosDisciplina = trabalhos.filter(i=>i.idDiscipline === idDiscipline);
        const notasGrau = listaTrabalhosDisciplina.filter(i=>i.idGrau === idGrau);
        for(let i in notasGrau){
            sum = sum + parseFloat(notasGrau[i].target); 
        }
        return sum;   
    }

    const addTrabalho=()=>{
        let totalAtualTarget = somaPontuacaoPretendida(idDiscipline, idGrau);

        if(title.length > 0 && target.length > 0 && discipline.length > 0 && grau.length > 0 ){

            if(parseFloat(totalAtualTarget) + parseFloat(target) <= 100){
                let item = {
                    id: uuid(),
                    title: title,
                    target: target,
                    gotPontuacao: 0,
                    discipline: discipline,
                    idDiscipline:idDiscipline,
                    grau: grau,
                    idGrau: idGrau,
                    description: description,
                    dataEntrega:dataEntrega,
                    done:false
                }
                
                props.addTrabalho(item);
                setTitle('');
                setTarget('');
                setDiscipline('');
                setDescription('');
    
                props.navigation.navigate('Home');
    
                 console.log(props.trabalhos);
            }else{
                alert('Pontuação disponível para essa disciplina: '+parseFloat(100-totalAtualTarget))
            }
            
        } else{
            alert('preencha todos os campos');
        }
    }

    const aumentarInput=()=>{
        setTamanhoInput(tamanhoInput+50);
    }

    return(
        <Page>
            <ScrollPage showsVerticalScrollIndicator={true}>
                <CustomModal  selecionouAction={(item)=>selecionouDisciplina(item)} visible={modalDisciplineVisible} closeAction={()=>setModalDisciplineVisible(false)}>

                </CustomModal>
                <CustomModalGrau  selecionouAction={(item)=>selecionouGrau(item)} visible={modalGrauVisible} closeAction={()=>setModalGrauVisible(false)}>

                </CustomModalGrau>
                <ViewAreaItem>
                <EntypoIcon name='bookmark' size={30}/>
                    <InputTitle
                        value={title}
                        onChangeText={(t)=>setTitle(t)}
                        placeholder={'Digite o título '}
                        
                    />

                </ViewAreaItem>
                
                <ViewAreaItem>
                <FontAwesomeIcon name='check-square-o' size={30}/>
                    <Input
                        value={target}
                        onChangeText={(t)=>setTarget(t)}
                        placeholder={'Pontuação do trab (0 a 100) '}
                        keyboardType={'numeric'}
                        keyboardAppearance={'dark'}
                        maxLength={3}
                    />
                </ViewAreaItem>

                <ViewAreaItem>
                    <FontAwesomeIcon name='calendar' size={30}/>
                     <SelectDate onPress={()=>setPickerDateVisible(true)} underlayColor='#c6c6c6'>
                        <TextDate>{dataEntrega}</TextDate>
                    </SelectDate>

                    <DateTimePickerModal
                        isVisible={pickerDateVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                      />
                </ViewAreaItem>
                
                

                
                
                <ViewAreaItem>
                    <EntypoIcon name='folder' size={30}/>
                    <SelectDisciplina onPress={()=>setModalDisciplineVisible(true)} underlayColor='#c6c6c6' >
                    <>
                            {discipline.length > 0 &&
                                <TextSelects>{discipline}</TextSelects>
                            }
                            {discipline.length ==0 &&
                                <TextSelects>Selecione a Disciplina</TextSelects>
                            }
                            
                        </>
                    </SelectDisciplina>
                </ViewAreaItem>
                
                <ViewAreaItem>
                <FontistoIcon name='thermometer' size={30}/>
                    <SelectGrau onPress={()=>setModalGrauVisible(true)} underlayColor='#c6c6c6'>
                        <>
                            {grau.length > 0 &&
                                <TextSelects>{grau}</TextSelects>
                            }
                            {grau.length ==0 &&
                                <TextSelects>Selecione o Grau</TextSelects>
                            }
                            
                        </>
                     </SelectGrau>
                </ViewAreaItem>
                
                <ViewAreaItem>
                <FontAwesome5Icon name='edit' size={30}/>
                    <InputDesc
                        multiline={true}
                        numberOfLines={5}
                        value={description}
                        onChangeText={(t)=>setDescription(t)}
                        placeholder={'Digite a descrição '}
                    />
                </ViewAreaItem>
                
                
            </ScrollPage>
            <Button onPress={addTrabalho}>
                    <Texto>Adicionar</Texto>
            </Button>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Adicionar Trabalho',
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
        addTrabalho:(trabalho)=>dispatch(TrabalhoActions.addTrabalho(trabalho))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);