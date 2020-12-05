import React from 'react';
import styled from 'styled-components/native';

const ListaItemSwipe = styled.TouchableHighlight`
    width:100%;
    height:50px;
    background-color:#FF0000;
    justify-content:center;
`;
const ListaItemIcon = styled.View`
    width:20px;
    height:20px;
    background-color:#FFF;
    margin-left:15px;
`;

export default (props) => {
    return (
        <ListaItemSwipe onPress={props.onDelete} underlayColor="#FF3333">
            <ListaItemIcon></ListaItemIcon>
        </ListaItemSwipe>
    );
}