import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import IconEntypo from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';

import * as TrabalhoActions from '../actions/TrabalhoActions';


import TrabalhoItem from '../components/TrabalhoItem';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    padding-bottom:10px;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const TrabalhosLista = styled.FlatList`
    flex:1;
    width:90%;
`;


const BtnAddTrab = styled.TouchableHighlight`
    height:70px;
    width:70px;
    border-radius:35;
    position:absolute;
    top:75%;
    right:5%;
    z-index:0;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
`;

const Pagina = (props)=>{

    const [trabalhosDisciplina, setTrabalhosDisciplina] = useState();

    console.log(trabalhosDisciplina);

    useEffect(()=>{
        preencherFiltro();
    },[]);

    const preencherFiltro=()=>{
        let filtro = [...props.trabalhos];
        
       filtro = filtro.filter((t)=>{
           return t.idDiscipline === props.navigation.state.params.id
       })

       setTrabalhosDisciplina(filtro);
        console.log(trabalhosDisciplina);
    }

    const addTrabalho =()=>{
        props.navigation.navigate('AddTrabalho');
    }

    

    return(
        <Page>

           <TrabalhosLista
                data={trabalhosDisciplina}
                renderItem={ ({item})=> <TrabalhoItem
                    data={item}
                    delAction={()=>props.delTrabalho(item)}
                /> }
           />
           <BtnAddTrab onPress={addTrabalho}>
                <IconEntypo name="add-to-list" size={30} color="#e4e5e5"/>
            </BtnAddTrab> 
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:navigation.state.params.title,
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
        addTrabalho:(trabalho)=>dispatch(TrabalhoActions.addTrabalho(trabalho)),
        delTrabalho:(trabalho)=>dispatch(TrabalhoActions.delTrabalho(trabalho))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);