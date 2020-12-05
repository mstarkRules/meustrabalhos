import React from 'react';

import styled from 'styled-components/native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';


const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Texto = styled.Text`
    font-size:23px;
`;

const BtnAddNote = styled.TouchableOpacity`
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

const Pagina = ()=>{
    return(
        <Page>
            <Texto>Hello Anotações!</Texto>
            
            <BtnAddNote>
                <MaterialIconsIcon name="speaker-notes" size={30} color="#DDD"/>
            </BtnAddNote>
        </Page>
        
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Minhas Anotações',
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

export default Pagina;
