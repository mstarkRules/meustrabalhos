import React, { useState } from 'react';
import uuid from 'uuid';
import styled from 'styled-components/native';

import * as DisciplinaActions from '../actions/DisciplinaActions';

import {connect} from 'react-redux';


const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Texto = styled.Text`
    font-size:23px;
    color:#f5f5f5;
`;

const Input = styled.TextInput`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:22;
    border-color:#666;
`;

const BtnAddDisciplinna = styled.Button`
`;

const Button = styled.TouchableHighlight`
    position:absolute;
    top:60%;
    z-index:0;
    background-color:#5f68ef;
    width:50%;
    justify-content:center;
    align-items:center;
    padding:5px;

`;

const Pagina = (props)=>{
    const [name, setName] = useState('');
    const [adicionouAction, setAdicionouAction] = useState(false);
    const addDisciplina=()=>{
        if(name.length > 0){
            let item = {
                id: uuid(),
                name:name,
                isActive:true,
                idSemestre:props.semestres[0].id,
                isCicloBasico:false,
                isAproved:false,
                notaG1:0,
                notaG2:0,
                notaFinal:0
            }
            
            props.addDisciplina(item);
            setName('');
           
            props.navigation.navigate('Disciplinas',{adicionouAction:!adicionouAction});

            //console.log(props.trabalhos);
        } else{
            alert('preencha todos os campos');
        }
        
    }
    

    return(
        <Page>
            <Input
                value={name}
                onChangeText={(t)=>setName(t)}
                placeholder={'Digite o título '}
                autoCapitalize='words'
            />
            <Button onPress={addDisciplina}>
                <Texto>Adicionar</Texto>
            </Button>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Adicionar Disciplina',
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
        semestres:state.userReducer.semestres
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addDisciplina:(disciplina)=>dispatch(DisciplinaActions.addDisciplina(disciplina))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);