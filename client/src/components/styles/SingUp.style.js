import styled from 'styled-components';

export const Container = styled.div`
    max-width: 260px;
    width: 260px;
    padding: 0 20px;
    margin: 0 auto;

    display: flex;
    align-items: flex-start;
    justify-content: center;

`

export const StyledInput = styled.input`
    width: 260px;
    display: block;
    margin-bottom: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.isValid ? "black" : "red"};
    
    
    
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    
`;

export const StyledHeader = styled.header`

    h1 {
        background-color: #ebfbff;
        color: black;
        text-align: center;
    }
    h3 {
        width:100%;
        color: black;
        text-align: center;
    }
`

export const StyledButton = styled.button`

    margin-left: 35%;
    margin-top: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    background-color: rgb(22, 140, 22);
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover{
        opacity: 70%;
    }
`

export const StyledErrMessage = styled.label`
    color: red;
    display: block;
    margin-bottom: 10px;
`
