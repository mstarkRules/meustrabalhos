import React, {useState, useEffect} from 'react';

import styled from 'styled-components/native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import * as TrabalhoActions from '../actions/TrabalhoActions';


import TrabalhoItem from '../components/TrabalhoItem';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:#e7e5e4;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const TrabalhosLista = styled.FlatList`
    flex:1;
    width:97%;
    padding-bottom:110;
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

    const [activeTrabalhos, setActiveTrabalhos] = useState([]);
   // console.log(activeTrabalhos);

    useEffect(()=>{
        preencherFiltro();
        console.log(activeTrabalhos);
    },[props.trabalhos]);





    const preencherFiltro=()=>{
        let trabalhos = [...props.trabalhos];
        let disciplinas = [...props.disciplinas];

        let novo = [];
        
       for (let i = 0; i < trabalhos.length; i++){
           for (let j = 0; j < disciplinas.length; j++){
               if(trabalhos[i].idDiscipline === disciplinas[j].id && disciplinas[j].isActive===true){
                   novo.push(trabalhos[i]);
               }
           }  
       }

      setActiveTrabalhos(novo);
    }

    let indice = activeTrabalhos.length;
    //console.log(indice);

    const addTrabalho =()=>{
        props.navigation.navigate('AddTrabalho');
    }


    

    return(
        <Page>

           <TrabalhosLista
                data={activeTrabalhos}
                renderItem={ ({item})=> <TrabalhoItem
                    data={item}
                    delAction={()=>props.delTrabalho(item)}
                    toggleAction={()=>props.toggleTrabalho(item.id)}
                    setGotPontuacaoAction={(gotPontuacao)=>props.setGotPontuacaoTrabalho(gotPontuacao, item.id)}
                />}
           />
           <BtnAddTrab onPress={addTrabalho} activeOpacity={0.7}>
                 <IconEntypo name="add-to-list" size={30} color="#e4e5e5"/>
           </BtnAddTrab>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Trabalhos',
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
        delTrabalho:(trabalho)=>dispatch(TrabalhoActions.delTrabalho(trabalho)),
        toggleTrabalho:(id)=>dispatch(TrabalhoActions.toggleTrabalho(id)),
        setGotPontuacaoTrabalho:(gotPontuacao, id)=>dispatch(TrabalhoActions.setGotPontuacaoTrabalho(gotPontuacao, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);