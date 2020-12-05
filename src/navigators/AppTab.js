import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Disciplinas from '../screens/Disciplinas';
import Trabalhos from '../screens/Trabalhos';
import Home from '../screens/Home';
import Login from '../screens/Login';

export default createBottomTabNavigator({
    Home:{
        screen: Home
    },
    Trabalhos:{
        screen: Trabalhos
    },
    Disciplinas:{
        screen: Disciplinas
    }
});

