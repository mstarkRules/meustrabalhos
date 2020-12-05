
import { StackActions, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';


const Preload = (props)=>{

    /*
    props.navigation.dispatch(StackActions.reset({
        index:0,
        actions:[
            NavigationActions.navigate({routeName:'StarterStack'})     
        ]
    }));
    */


    if(props.name.length===0){
        //mandar para starterStack
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'StarterStack'})     
            ]
        }));
    } else{
        //mandar para AppTab
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Home'})     
            ]
        }));
    }

    return null;
}


const mapStateToProps=(state)=>{
    return{
        name:state.userReducer.name,
        isLogged:state.userReducer.isLogged
    };
}

export default connect(mapStateToProps)(Preload);