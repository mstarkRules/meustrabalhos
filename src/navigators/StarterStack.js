import { createStackNavigator } from "react-navigation-stack";

import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
import StarterDisciplinas from '../screens/StarterDisciplinas';

export default createStackNavigator({
    StarterIntro,
    StarterName,
    StarterDisciplinas
});
