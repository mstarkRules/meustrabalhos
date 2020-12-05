import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';

import CustomModal from '../components/CustomModal';
import CustomModalGrau from '../components/CustomModalGrau';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as TrabalhoActions from '../actions/TrabalhoActions';

import {connect} from 'react-redux';


const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:flex-start;
    background-color:#f6f6f6;
`;

const Texto = styled.Text`
    font-size:23px;
    color:#f5effa;

`;
const TextSelects = styled.Text`
    font-size:23px;
    font-weight:bold;
`;

const TextDate = styled.Text`
    font-size:22px;
`;

const TextResult = styled.Text`
    font-size:35px;
    font-weight:bold;
`;

const TextSituacao = styled.Text`
    font-size:21px;
`;

const Input = styled.TextInput`
    margin-top:5px;
    border-bottom-width: 1px;
    height:50;
    width:80%;
    padding:10px;
    font-size:20px;
    border-color:#666;
`;

const ResultArea = styled.View`
    margin-top:5px;
    width:100%;
    height:60px;
    align-items:center;
    justify-content:center;
`;

const Button = styled.TouchableHighlight`
    position:absolute;
    bottom:0%;
    z-index:0;
    background-color:#5f68ef;
    width:100%;
    justify-content:center;
    align-items:center;
    padding:10px;

`;

const ViewAreaItem = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width:100%;
`;






const Pagina = (props)=>{
    const [g1, setG1] = useState(0);
    const [g2, setG2] = useState(0);
    const [result, setResult] = useState(0);
    const [calculou, setCalculou] = useState(false);
    const [btnText, setBtnText] = useState('Calcular');
    const [isAproved, setIsAproved] = useState ('');

    const calcular=()=>{
        
        if(g1.length > 0 && g2.length > 0){
            let final = 0;
            final = (parseFloat(g1)+(parseFloat(g2)*2)) / 3;
            setResult(final.toFixed(1));
            setCalculou(!calculou);
            setBtnText('Zerar');

            if(toString(btnText) == 'Calcular'){
                setIsAproved('');
            }

            if(calculou == true){
                setG1(0);
                setG2(0);
                setResult(0);
                setIsAproved('');
            }
            if(parseFloat(result) > 0){
                setBtnText('Calcular');
            }

            if(parseFloat(final) >= 60){
                setIsAproved('Aprovado!!!');
            } else{
                setIsAproved('Reprovado! :(');
            }
            
            return parseFloat(final);

        } else{
            alert('Preencha todos os campos, jovi!');
        }
        
    }

    return(
        <Page>
                <ViewAreaItem>
                <TextDate>GI</TextDate>
                    <Input
                        value={g1}
                        onChangeText={(t)=>setG1(t)}
                        placeholder={'Digite a nota do G1 '}
                        keyboardType={'numeric'}
                        keyboardAppearance={'dark'}
                        maxLength={3}
                        autoFocus={true}
                    />

                </ViewAreaItem>
                
                <ViewAreaItem>
                <TextDate>GII</TextDate>
                    <Input
                        value={g2}
                        onChangeText={(t)=>setG2(t)}
                        placeholder={'Digite a nota do G2'}
                        keyboardType={'numeric'}
                        keyboardAppearance={'dark'}
                        maxLength={3}
                    />
                </ViewAreaItem>

                <ResultArea>
                    <TextResult>
                        {result}
                    </TextResult>
                    <TextSituacao>
                        {parseFloat(result)>0?isAproved:''}
                    </TextSituacao>
                </ResultArea>
                
            <Button onPress={calcular}>
                    <Texto>{btnText}</Texto>
            </Button>
        </Page>
    )
}

Pagina.navigationOptions=({navigation})=>{
    return{
        title:'Calcular uma Nota',
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
        addTrabalho:(trabalho)=>dispatch(TrabalhoActions.addTrabalho(trabalho))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pagina);