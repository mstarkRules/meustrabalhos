import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Disciplina = styled.TouchableOpacity`
    min-height:100;
    width:100%;
    background-color:${props=>!props.aproveitamento?'#5f68ef':((props)=>props.aproveitamento >=75 ? '#0a9830':'#c74c05')};
    border-radius:10px;
    margin-bottom:20px;
    justify-content:center;
    align-items:flex-start;
`;

const Texto = styled.Text`
    font-size:20;
    font-family:Helvetica;
    color:#444;
    margin-left:20px;
`;

const TextTitle = styled.Text`
    font-size:20;
    font-family:Helvetica;
    color:#c0c4f2;
    font-weight:bold;
    margin-left:20px;
`;

const TextoMediaFinal = styled.Text`
    font-size:25;
    font-family:Helvetica;
    font-weight:bold;
    color:#444;
    margin-left:20px;
`;

const TextoBtn = styled.Text`
    font-size:20px;
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

export default(props)=>{
    //console.log(props.data)

    const clicou=()=>{
		props.navigation.navigate('DisciplinaTrabalhos', {title:props.data.name, id:props.data.id});
	}

    return(
        <Disciplina onPress={clicou} activeOpacity={0.7}>
            <TextTitle>{props.data.name} - <Texto>{props.data.isActive?'cursando':'inativa'}</Texto> </TextTitle>
            <TextoMediaFinal>Final - {props.data.notaFinal}</TextoMediaFinal>
            <Texto>GI - {props.data.notaG1}</Texto>
            <Texto>GII - {props.data.notaG2}</Texto>
        </Disciplina>
    );
}