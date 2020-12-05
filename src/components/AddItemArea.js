import React, { useState } from 'react';
import styled from 'styled-components/native';

const AdditemArea = styled.View`
    background-color:#CCC;
    padding:10px;
`;
const AddItemInput = styled.TextInput`
    background-color:#FFF;
    font-size:15px;
    height:50px;
    border-radius:5px;
    padding:10px;
`;

export default (props) => {
    const [ item, setItem ] = useState('');

    const handleSubmit = () => {
        if(item.trim() != '') {
            props.onAdd(item.trim());
            setItem('');
        }
    }

    return (
        <AdditemArea>
            <AddItemInput
                placeholder="Digite um novo item"
                value={item}
                onChangeText={e=>setItem(e)}
                onSubmitEditing={handleSubmit}
                returnKeyType="send"
            />
        </AdditemArea>
    );
}