import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { delTrabalho } from '../actions/TrabalhoActions';

import CustomModalGotPontuacao from './CustomModalGotPontuacao';



const Trabalho = styled.TouchableOpacity`
    height:auto;
    min-height:120;

    justify-content:center;
    align-items:flex-start;
    width:100%;
    background-color:#5f68ef;
    border-radius:5px;
    margin:5px;
`;

const Container = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width:100%;
`;

const Texto = styled.Text`
    font-size:17;
    font-family:inherit;
`;

const StrongText = styled.Text`
    font-size:17px;
    font-family:Georgia;
    font-weight:bold;
`;

const TextoDay = styled.Text`
    font-size:22px;
    font-family:Helvetica;
    font-weight:bold;
    color:#444;
`;

const TextoMonth = styled.Text`
    font-size:15;
    font-family:Helvetica;
    font-weight:bold;
    color:#929292;
`;

const TextoTarget = styled.Text`
    font-size:16px;
    font-weight:bold;
`;

const DataArea = styled.View`
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-left:10px;
    margin-right:10px;

`;

const DayArea =styled.View`

`;

const MonthArea = styled.View`
`;

const DisciplinaTextArea = styled.View`
    flex-direction:column;
    flex:2;
    justify-content:center;
    align-items:flex-start;
    margin-left:10px;
`;

const TextoArea = styled.View`
    flex-direction:row;
    align-items:center;

`;

const InfoArea = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;

    width:100%;
`;

const PontuacaoAreaText = styled.View`
    flex-direction:row;
`;

const BtnArea = styled.View`
    flex-direction:column;
    justify-content:center;
    align-items:flex-end;
    width:100px;
    padding-right:12px;
`;


const BtnDel = styled.TouchableOpacity`
    height:30;
    width:30px;
    border-radius:15px;
    margin-bottom:10px;
    justify-content:center;
    align-items:center;
`;

const BtnToggle = styled.TouchableOpacity`

    height:30;
    width:30px;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`;

const InputPontuacao = styled.TextInput`
    border-bottom-width:1px;
    width:30%;
    height:40px;
    background-color:#fff;
`;


export default(props)=>{
    const [month, setMonth] = useState('DEZ');
    const [modalGotPontuacaoVisible, setModalGotPontuacaoVisible] = useState(false);
    const [ gotPontuacao, setGotPontuacao] = useState(0);

    const delTrabalho=()=>{
        props.delAction();
    }
    
    const toggleTrabalho=()=>{
        props.toggleAction();
        if(props.data.done==true){
            setModalGotPontuacaoVisible(true)
        }
    }

    const setGotPontuacaoTrabalho=(gotPontuacao, id)=>{
      //  alert(gotPontuacao, id)
        props.setGotPontuacaoAction(gotPontuacao, id);
        setModalGotPontuacaoVisible(false);
    }

    let textBtn='';
    

    let btnTextoAction=()=>{
        if(props.data.done){
           setBtnTexto('Marcar como feito')
        }else{
            setBtnTexto('Marcar como desfeito')
        }
    }
    const clicou =()=>{
    }


    return(
    
        
        <Trabalho onPress={clicou} activeOpacity={0.7}>
            <CustomModalGotPontuacao setGotPontuacaoAction={(gotPontuacao)=>setGotPontuacaoTrabalho(gotPontuacao, props.data.id)} closeAction={()=>setModalGotPontuacaoVisible(false)} visible={modalGotPontuacaoVisible}>

            </CustomModalGotPontuacao>
            <Container>
                <DataArea>
                    <DayArea>
                        <TextoDay>{props.data.dataEntrega[0]}{props.data.dataEntrega[1]}</TextoDay>
                    </DayArea>
                    <MonthArea>
                        <TextoMonth>{month}</TextoMonth>
                    </MonthArea>
                </DataArea>
                <DisciplinaTextArea>
                    <TextoArea>
                         <Texto><StrongText>{props.data.discipline} - </StrongText> {props.data.title}</Texto>
                    </TextoArea>
                    
                    <InfoArea>
                        <PontuacaoAreaText>
                            {props.data.gotPontuacao > 0 && <TextoTarget>{props.data.gotPontuacao} /</TextoTarget> }
                            
                            <TextoTarget>{props.data.target}pts</TextoTarget>
                        </PontuacaoAreaText>
                        
                        <TextoTarget>{props.data.grau}</TextoTarget>
                    </InfoArea>
                    
                </DisciplinaTextArea>
                
                <BtnArea>
                    <BtnDel  onPress={()=>delTrabalho()}> 
                        <Icon name='trash' size={30} color="#333"/> 
                    </BtnDel>

                    <BtnToggle  onPress={()=>toggleTrabalho()}> 
                         {props.data.done==true &&
                            <Icon name='check' size={30} color="#509903"/>}
                        {props.data.done ==false &&
                            <Icon name='check-circle-o' size={30} color="#135df0"/> 
                        }
                         
                          
                    </BtnToggle>
                </BtnArea>
                 
                   
                
            </Container>
            
            
        </Trabalho>
    );
}


