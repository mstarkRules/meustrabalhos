import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';

import * as DisciplinaActions from '../actions/DisciplinaActions';

const Disciplina = styled.TouchableOpacity`
    min-height:140;
    width:100%;
    background-color:${props=>!props.aproveitamento?'#5f68ef':((props)=>props.aproveitamento >=75 ? '#0a9830':'#c74c05')};
    border-radius:10px;
    margin-bottom:20px;
    justify-content:center;
    align-items:center;
`;

const Texto = styled.Text`
    font-size:20px;
    font-family:Helvetica;

    color:#444;
    margin-left:20px;
`;

const TextoMediaFinal = styled.Text`
    font-size:25px;
    font-family:Helvetica;
    font-weight:bold;
    color:#444;
    margin-left:20px;
`;

const TextoBtn = styled.Text`
    font-size:12px;
    font-family:Helvetica;
    font-weight:bold;
    color:#444;
`;

const TextArea = styled.View`
    flex-direction:column;
    flex:1;
`;

const ItemsArea = styled.View`
    flex-direction:row;
`;

const ButtonPrever = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    margin-top:10px;
    margin-right:20px;

`;

const ButtonSincronizar = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    margin-top:10px;
    margin-right:20px;
`;

const Button = styled.Button``;




const DisciplinaHomeItem=(props)=>{
    //console.log(props.data)
    const [sumG1Target, setSumg1Target] = useState(0);
    const [sumG2Target, setSumG2Target] = useState(0);
    const [corDisciplina, setCorDisciplina] = useState('#5f68ef');

    useEffect(()=>{
        let sum = props.somaPontuacaoPretendidaGI();
        setSumg1Target(sum);
        let sum2 = props.somaPontuacaoPretendidaGII();
        setSumG2Target(sum2);
    
    },[props.data, sumG1Target, sumG2Target])


    const calcularAproveitamento=()=>{
        let pct = (100 * (parseFloat(props.sumG1) + parseFloat(props.sumG2)))/(parseFloat(sumG1Target) + parseFloat(sumG2Target));
       // console.log(pct) 
        return parseFloat(pct);  
    }



    const clicou=()=>{
        
    }
    
    const setNotaFinal=(id, notaFinal, notaG1, notaG2)=>{
        props.setNotaFinalDisciplina(id, notaFinal);
        props.setNotaGrauI(id, notaG1);
        props.setNotaGrauII(id, notaG2);
        console.log(props.disciplinas);
    }

    return(
        <Disciplina onPress={clicou} cor={corDisciplina} aproveitamento={calcularAproveitamento()} activeOpacity={0.7}>
            <ItemsArea>
                <TextArea>
                <TextoMediaFinal>{props.data.name} - {props.data.nota}pts</TextoMediaFinal>
                    <Texto>GI - {props.sumG1}/{sumG1Target} </Texto>
                    <Texto>GII - {props.sumG2}/{sumG2Target}</Texto>
                    
                    {props.data.nota >=60 &&
                        <Texto>Aprovado!</Texto>
                    }
                    
                </TextArea>
                   
                <ButtonPrever onPress={()=>props.calcularPrevisaoFinal(props.data.id, props.data.name)}>
                   
                    <MaterialCommunityIconsIcon name='calendar-question' size={30}/>
                    <TextoBtn>Prever</TextoBtn>
                </ButtonPrever>
                <ButtonSincronizar onPress={()=>setNotaFinal(props.data.id, props.data.nota, props.sumG1, props.sumG2)}>
                   
                    <MaterialCommunityIconsIcon name='content-save' size={30}/>
                    <TextoBtn>Salvar</TextoBtn>
                </ButtonSincronizar>

            </ItemsArea>
            
           
            
        </Disciplina>
    );
}

const mapStateToProps=(state)=>{
    return{
        trabalhos:state.userReducer.trabalhos,
        disciplinas:state.userReducer.disciplinas
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setNotaFinalDisciplina:(id, notaFinal)=>dispatch(DisciplinaActions.setNotaFinalDisciplina(id, notaFinal)),
        setNotaGrauI:(id, notaG1)=>dispatch(DisciplinaActions.setNotaGrauI(id, notaG1)),
        setNotaGrauII:(id, notaGrauII)=>dispatch(DisciplinaActions.setNotaGrauII(id, notaGrauII))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DisciplinaHomeItem);