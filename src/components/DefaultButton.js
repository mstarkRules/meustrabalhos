import styled from 'styled-components/native';

export default styled.TouchableHighlight`
    width: ${props=>props.width || 'auto'};
    background-color:${props=>props.color || '#1cbb00'} ;
    padding:20px;
    border-radius:10;
    justify-content:center;
    align-items:center;
    margin:10px;
`;