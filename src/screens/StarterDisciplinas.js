import React, {useEffect, useState} from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import  { Text, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import DefaultButton from '../components/DefaultButton';
import lista from '../components/lista';
import uuid from 'uuid';
import DisciplinaItemIntro from '../components/DisciplinaItemIntro';

import * as DisciplinaActions from '../actions/DisciplinaActions';

import {connect} from 'react-redux';
import DisciplinaItem from '../components/DisciplinaItem';

const Container = styled.SafeAreaView`
    flex:1;
    align-items:center;
    justify-content:center
    background-color:#e9eff9;

`;

const Header = styled.View`
    margin-top:40;
    justify-content:center;
    align-items:center;
    width:90%;
`;


const Texto = styled.Text`
    font-size:18px;
`;

const StrongText = styled.Text`
    font-weight:bold;
    font-size:25px;
    margin-top:20;
`;

const BoldText = styled.Text`
    font-weight:bold;
    font-size:18;
`;

const DisciplinaList = styled.FlatList`
    max-height:40%;
    width:90%;
    padding:10px;

`;

const InputTitle = styled.TextInput`
    top:65%;
    position:absolute;
    padding:10px;
    border:1px solid #777;
    height:50px;
    width:90%;
    font-size:22px;
    border-radius:5px;
    background-color:#FFF;
`;

const Input = styled.TextInput`
    margin-top:5px;
    border-bottom-width: 0.5px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;

const TextButton = styled.Text`
    color:#FFF;
`;

const BtnAdd = styled.TouchableOpacity`
    height:70px;
    width:70px;
    border-radius:35;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
`;

const BtnConcluir = styled.TouchableOpacity`
    height:70px;
    width:70px;
    border-radius:35;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
`;

const BotaoArea = styled.View`
    margin-top:10px;
    flex-direction:row;
    justify-content:space-around;
    width:100%;
    padding:10px;
`;



const Pagina=(props)=>{


    const [disciplina, setDisciplina] = useState('');
    const[disciplinas, setDisciplinas] = useState('');
    const [listaDisciplinas, setListaDisciplinas] = useState([]);
    const [adicionou, setAdicionou] = useState(false);

    let filtro = [...props.disciplinas];
    useEffect(()=>{
        preencherFiltro();
    },[adicionou]);

    const preencherFiltro=()=>{
        filtro = filtro.filter((t)=>t.isActive===true);
        setListaDisciplinas(filtro);
    }

    const addDisciplina=()=>{
        if(disciplina.length > 0){
            let item = {
                id: uuid(),
                name:disciplina,
                isActive:true,
                idSemestre:props.semestres[0].id,
                isCicloBasico:false,
                isAproved:false,
                notaG1:0,
                notaG2:0,
                notaFinal:0,
                
            }
            
            props.addDisciplina(item);

            setDisciplina('');

           // console.log(listaDisciplinas);
        } else{
            alert('Digite um nome');
        }
        Keyboard.dismiss();
        setAdicionou(!adicionou);
    }

    const nextAction=()=>{
        if(listaDisciplinas.length >0){
            props.navigation.dispatch(StackActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'Home'})     
                ]
            }));
        } else{
            alert('Não me ignore, jovem, adicione pelo menos uma!');
        }
        
        
    }

    let firstName = props.name.split(' ')[0];

    return(
        <Container>
            <Header>
                <Texto>Olá, <BoldText>{firstName}</BoldText>, como você tá?</Texto>
            </Header>
            <StrongText>Adicione suas disciplinas</StrongText>
           <DisciplinaList 
                data={listaDisciplinas}
                renderItem={({item})=>
                    <DisciplinaItemIntro data={item}/>
                }
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
           />
           <Input
                value={disciplina}
                onChangeText={(t)=>setDisciplina(t)}
                placeholder='Adicione uma disciplina ;)'
                onSubmitEditing={addDisciplina}
                autoFocus={true}
                autoCapitalize='words'
           />
            <BotaoArea>
                <BtnAdd onPress={addDisciplina} activeOpacity={0.8}>
                    <AntDesignIcon name="addfolder" size={30} color="#e4e5e5"/>  
                 </BtnAdd>

                 <BtnConcluir onPress={nextAction} activeOpacity={0.8}>
                    <FontAwesome5Icon name="check" size={30} color="#e4e5e5"/>
                 </BtnConcluir>   
            </BotaoArea>
           
           
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
        disciplinas:state.userReducer.disciplinas,
        name:state.userReducer.name,
        semestres:state.userReducer.semestres
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setName:(name)=>dispatch({type:'SET_NAME',payload:{name}}),
        addDisciplina:(disciplina)=>dispatch(DisciplinaActions.addDisciplina(disciplina))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagina);