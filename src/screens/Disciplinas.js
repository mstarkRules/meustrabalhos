import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';
import DisciplinaItem from '../components/DisciplinaItem';


const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    align-content:center;
    padding-top:10px;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const DisciplinaLista = styled.FlatList`
    flex:1;
    width:90%;
`;

const BtnAddDisciplina = styled.Button`
`;

const BtnAddTrab = styled.TouchableOpacity`
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
    const [listaDisciplinas, setListaDisciplinas] = useState();
    const [adicionou, setAdicionou] = useState(false);

    console.log(listaDisciplinas);

    useEffect(()=>{
        preencherFiltro();
    },[props.disciplinas]);

    const preencherFiltro=()=>{
        let filtro = [...props.disciplinas];
        
        filtro = filtro.filter((t)=>t.isActive===true);
        setListaDisciplinas(filtro);
        
    }

    const addTrabalho =()=>{
        props.navigation.navigate('AddTrabalho');
    }


    const addDisciplina=()=>{
        if(props.semestres.findIndex(i=>i.isActive==true) < 0){
            alert('Não há semestres ativos!');
        } else{
            props.navigation.navigate('AddDisciplina');
        }
      
    }

    return(
        <Page>
            <DisciplinaLista
                data={listaDisciplinas}
                renderItem={({item})=> <DisciplinaItem
                    data={item}
                    navigation={props.navigation}
                />}
            />

            <BtnAddTrab  onPress={addDisciplina} activeOpacity={0.7}>
                <AntDesignIcon name="addfolder" size={30} color="#e4e5e5"/>
            </BtnAddTrab>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Disciplinas',
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
        disciplinas:state.userReducer.disciplinas,
        semestres:state.userReducer.semestres
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addDisciplina:(disciplina)=>dispatch(TrabalhoActions.addTrabalho(disciplina))        

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);