import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Preload from '../screens/Preload';
import StarterStack from './StarterStack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import AppTab from './AppTab';
import Trabalhos from '../screens/Trabalhos';
import Disciplinas from '../screens/Disciplinas';
import Anotacoes from '../screens/Anotacoes';
import Semestres from '../screens/Semestres';
import AddTrabalho from '../screens/AddTrabalho';
import AddDisciplina from '../screens/AddDisciplina';
import DisciplinaTrabalhos from '../screens/DisciplinaTrabalhos';
import SemestreDisciplinas from '../screens/SemestreDisciplinas';
import CalcularOutraNota from '../screens/CalcularOutraNota';

const MainStackNavigator = createStackNavigator({
    Preload,
    Login,
    StarterStack:{
        screen: StarterStack,
        navigationOptions:{
            header:null
        }
    },
    Home,
    Trabalhos,
    Disciplinas,
    Anotacoes,
    Semestres,
    AddTrabalho,
    AddDisciplina,
    DisciplinaTrabalhos,
    SemestreDisciplinas,
    CalcularOutraNota

},{
    initialRouteName:'Preload',
 
});

export default   createAppContainer(MainStackNavigator);