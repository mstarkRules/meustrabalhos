import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Disciplina = styled.TouchableOpacity`
    min-height:70;
    width:100%;
    background-color:${props=>!props.aproveitamento?'#5f68ef':((props)=>props.aproveitamento >=75 ? '#0a9830':'#c74c05')};
    border-radius:10px;
    margin-bottom:20px;
    justify-content:center;
    align-items:flex-start;
`;

const Texto = styled.Text`
    font-size:20px;
    font-family:Helvetica;
    font-weight:bold;
    color:#2e2e2f;
    margin-left:20px;
`;

const TextoNormal = styled.Text`
    font-size:18px;
    font-family:Helvetica;
    color:#555;
    margin-left:20px;
`;

export default(props)=>{
    //console.log(props.data)

    const clicou=()=>{
	
	}

    return(
        <Disciplina onPress={clicou} activeOpacity={0.7}>
            <Texto>{props.data.name} - <TextoNormal>{props.data.isActive?'cursando':'inativa'}</TextoNormal> </Texto>
        </Disciplina>
    );
}