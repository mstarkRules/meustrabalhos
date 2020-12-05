import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

import * as TrabalhoActions from '../actions/TrabalhoActions';
import * as DisciplinaActions from '../actions/DisciplinaActions';

import {connect} from 'react-redux';
import Disciplinas from './Disciplinas';
import ListaItem from '../components/ListaItem';

import TrabalhoItem from '../components/TrabalhoItem';
import AddTrabalho from './AddTrabalho';
import DisciplinaHomeItem from '../components/DisciplinaHomeItem';

const Page = styled.SafeAreaView`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const ScrollPage = styled.ScrollView`
    width:100%;
    background-color:#e9eff9;
`;

const Texto = styled.Text`
    font-size:23px;
    color:#e4e5e5;
    `;

const SectionsArea = styled.View`
    width:100%;
    height:250;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    align-content:center;
    border-bottom-width:1px; 
`;


const TrabalhoSection = styled.TouchableOpacity`
    width:40%;
    height:100;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    margin:10px;
    border-radius:5px;
`;
const DisciplinaSection = styled.TouchableOpacity`
    width:40%;
    height:100;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    margin:10px;
    border-radius:5px;
    border-color:#ccc;
`;
const AnotacoesSection = styled.TouchableOpacity`
    width:40%;
    height:100;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    margin:10px;
    border-radius:5px;
`;
const SemestresSection = styled.TouchableOpacity`
    width:40%;
    height:100;
    background-color:#5f68ef;
    justify-content:center;
    align-items:center;
    margin:10px;
    border-radius:5px;
`;

const TrabalhosArea = styled.View`
    width:97%;
    margin-top:10px;
    background-color:#c6c6c6;
    justify-content:center;
    align-items:center;
    margin-bottom:10;
    border-radius:5px;
    border-bottom-width:1px; 
    border-color:#555;
`;


const Trabalho = styled.View`
    width:100%;
    height:auto;
    background-color:#e9eff9;
`;

const TextoTitle = styled.Text`
    font-size:20px;
    font-weight:bold;
    font-family:Arial;
`;

const Button = styled.TouchableOpacity`
    height:70px;
    width:70px;
    border-radius:35;
    position:absolute;
    top:64%;
    right:5%;
    z-index:0;
    background-color:#0a9830;
    justify-content:center;
    align-items:center;
`;

const ButtonCalcular = styled.TouchableOpacity`
    height:50px;
    width:50px;
    border-radius:25;
    position:absolute;
    top:85.5%;
    right:6.5%;
    z-index:0;
    background-color:#0a9830;
    justify-content:center;
    align-items:center;
`;

const DisciplinasArea = styled.View`
    background-color:#e9eff9;
    width:100%;
    margin-top:10;
    padding-bottom:200px;
`;

const DisciplinaLista = styled.FlatList`
    margin-top:10px;
    width:100%;
    padding:5px;
`;


const Pagina= (props)=>{
    const [listaNotasDisciplinas, setListaNotasDisciplinas] = useState([]);
    const [activeTrabalhos, setActiveTrabalhos] = useState([]);

    const trabalhosAction=()=>{
        props.navigation.navigate('Trabalhos');
    };

    const disciplinasAction=()=>{
        props.navigation.navigate('Disciplinas');
    };
    const anotacoesAction=()=>{
        props.navigation.navigate('Anotacoes');
    };
    const semestresAction=()=>{
        props.navigation.navigate('Semestres');
    };

    const calcularOutraNotaAction=()=>{
        props.navigation.navigate('CalcularOutraNota');
    }

    const addTrabalho=()=>{
        props.navigation.navigate('AddTrabalho');
    }
    
    let trabalhos = [...props.trabalhos];
    let disciplinas = [...props.disciplinas];
    
    useEffect(()=>{
        preencherProximosTrabalhos();
    },[props.trabalhos]);

    useEffect(()=>{
        calcularGrauI();
        calcularGrauII();
        calcularNotasDisciplinas();
    },[props.trabalhos, props.disciplinas]);
    
    const preencherProximosTrabalhos=()=>{
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
    

    const calcularGrauI=(id)=>{
        let sumTarget = 0;
        let sumGotPontuacao = 0;
        const listaTrabalhosDisciplina = trabalhos.filter(i=>i.idDiscipline === id);
        const notasGrauI = listaTrabalhosDisciplina.filter(i=>i.idGrau === '1');
        for(let i in notasGrauI){
            sumGotPontuacao = sumGotPontuacao + parseFloat(notasGrauI[i].gotPontuacao);
        }
        return parseFloat(sumGotPontuacao);
    }

    const calcularGrauII=(id)=>{
        let sumTarget = 0;
        let sumGotPontuacao = 0;
        const listaTrabalhosDisciplina = trabalhos.filter(j=>j.idDiscipline === id);
        const notasGrauII = listaTrabalhosDisciplina.filter(j=>j.idGrau ==='2');
        for(let j in notasGrauII){
            sumGotPontuacao = sumGotPontuacao + parseFloat(notasGrauII[j].gotPontuacao);
        }
        return parseFloat(sumGotPontuacao);
    }

    const calcularNotasDisciplinas=()=>{
       // console.log('props.disciplinas');
        let notas = [];
        let nota = 0;
        let listaDisciplinas = disciplinas.filter(i=>i.isActive ===true);
        for (let i in listaDisciplinas){
             nota = (calcularGrauI(listaDisciplinas[i].id) + (calcularGrauII(listaDisciplinas[i].id)*2))/3;
             notas.push({
                 id:listaDisciplinas[i].id,
                 name:listaDisciplinas[i].name,
                 nota:parseFloat(nota.toFixed(1))
             });   
             
        }
        setListaNotasDisciplinas(notas);
        console.log(listaNotasDisciplinas);
    }

    const somaPontuacaoPretendida=(idDiscipline, idGrau)=>{
        let sum = 0;
        const listaTrabalhosDisciplina = trabalhos.filter(i=>i.idDiscipline === idDiscipline);
        const notasGrau = listaTrabalhosDisciplina.filter(i=>i.idGrau === idGrau);
        for(let i in notasGrau){
            sum = sum + parseFloat(notasGrau[i].target); 
        }
        //alert(sum);
        return parseFloat(sum);
    }

    const calcularPrevisaoFinal=(id,name)=>{
        let g1 = parseFloat(calcularGrauI(id));
        for (let i = 0; i<=100; i++){
            let final =(g1+(i*2))/3;
            if (final>= 60){
                alert('Você precisa tirar pelo menos '+i+' no gII, '+props.name+'!');
                return final;
            }
        }    
    }
    

    return(
        <Page>
            <ScrollPage>
                <SectionsArea>
                        <TrabalhoSection onPress={trabalhosAction} activeOpacity={0.6}>
                        <FontAwesome5Icon name="th-list" size={30} color="#DDD"/>
                            <Texto>Trabalhos</Texto>
                        </TrabalhoSection>

                        <DisciplinaSection onPress={disciplinasAction} activeOpacity={0.6}>
                         <FontAwesome5Icon name="folder-open" size={32} color="#e4e5e5"/>
                            <Texto>Disciplinas</Texto>
                        </DisciplinaSection>

                        <AnotacoesSection onPress={anotacoesAction} activeOpacity={0.6}>
                            <MaterialIconsIcon name="speaker-notes" size={30} color="#DDD"/>   
                            <Texto>Anotações</Texto>
                        </AnotacoesSection>

                        <SemestresSection onPress={semestresAction} activeOpacity={0.6}>
                        <Icon name="calendar" size={30} color="#DDD"/>
                            <Texto>Semestres</Texto>
                        </SemestresSection>
                        
                </SectionsArea>
                
                <TrabalhosArea>
                {activeTrabalhos.length > 0 &&
                    <Trabalho>
                        <TextoTitle>Próximos Trabalhos</TextoTitle>
                            <TrabalhoItem
                                data={activeTrabalhos[0]}
                                delAction={()=>props.delTrabalho(activeTrabalhos[0])}
                                toggleAction={()=>props.toggleTrabalho(activeTrabalhos[0].id)}
                                setGotPontuacaoAction={(gotPontuacao)=>props.setGotPontuacaoTrabalho(gotPontuacao, activeTrabalhos[0].id)}
                                
                            />
                            {activeTrabalhos.length > 1 &&
                                <TrabalhoItem
                                data={activeTrabalhos[1]}
                                delAction={()=>props.delTrabalho(activeTrabalhos[1])}
                                toggleAction={()=>props.toggleTrabalho(activeTrabalhos[1].id)}
                                setGotPontuacaoAction={(gotPontuacao)=>props.setGotPontuacaoTrabalho(gotPontuacao, activeTrabalhos[1].id)}
                                />
                            }
                            {activeTrabalhos.length > 2 &&
                                <TrabalhoItem
                                data={activeTrabalhos[2]}
                                delAction={()=>props.delTrabalho(activeTrabalhos[2])}
                                toggleAction={()=>props.toggleTrabalho(activeTrabalhos[2].id)}
                                setGotPontuacaoAction={(gotPontuacao)=>props.setGotPontuacaoTrabalho(gotPontuacao, activeTrabalhos[2].id)}
                            />}

                        
                    </Trabalho>
                }
                

                </TrabalhosArea>
                <TextoTitle>Minhas Disciplinas</TextoTitle>
                <DisciplinasArea>
                    <DisciplinaLista
                        data={listaNotasDisciplinas}
                        renderItem={({item})=> <DisciplinaHomeItem
                            data={item}
                            sumG1={calcularGrauI(item.id)}
                            sumG2={calcularGrauII(item.id)}
                            calcularPrevisaoFinal={(id,name)=>calcularPrevisaoFinal(id,name)}
                            somaPontuacaoPretendidaGI={(id)=>somaPontuacaoPretendida(item.id, '1')}
                            somaPontuacaoPretendidaGII={(id)=>somaPontuacaoPretendida(item.id, '2')}
                        />}
                    />
                </DisciplinasArea>
            </ScrollPage>
           
            <Button onPress={()=>addTrabalho()} activeOpacity={0.6} >
                <IconEntypo name="add-to-list" size={30} color="#e4e5e5"/>
            </Button>

            <ButtonCalcular onPress={calcularOutraNotaAction}>
                <IconEntypo name="calculator" size={23} color="#e4e5e5"/>   
            </ButtonCalcular>
            
        </Page>
    )
}

Pagina.navigationOptions=({navigation}) =>{
    return{
        title:'Meus Trabalhos',
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
        disciplinas: state.userReducer.disciplinas,
        name:state.userReducer.name
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setName:(name)=>dispatch({type:'SET_NAME',payload:{name}}),
        delTrabalho:(trabalho)=>dispatch(TrabalhoActions.delTrabalho(trabalho)),
        toggleTrabalho:(id)=>dispatch(TrabalhoActions.toggleTrabalho(id)),
        setGotPontuacaoTrabalho:(gotPontuacao, id)=>dispatch(TrabalhoActions.setGotPontuacaoTrabalho(gotPontuacao, id)),
        setNotaFinalDisciplina:(id, notaFinal)=>dispatch(DisciplinaActions.setNotaFinalDisciplina(id, notaFinal))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagina);


