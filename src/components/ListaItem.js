import React from 'react';
import styled from 'styled-components/native';

const Item = styled.TouchableHighlight`
  background-color:#EEE;
  flex-direction:row;
  height:50px;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
`;
const ItemText = styled.Text`
  font-size:15px;
  flex:1;
`;
const ItemCheck = styled.View`
  width:20px;
  height:20px;
  border-radius:10px;
  border:5px solid #CCC;
  background-color:${props=>props.done?'#CCC':'transparent'};
`;

export default (props) => {
    return (
        <Item underlayColor="#DDD" activeOpacity={1}>
            <>
            <ItemText>{props.data.title}</ItemText>
            </>
        </Item>
    );
}