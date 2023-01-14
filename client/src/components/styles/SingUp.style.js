import styled from 'styled-components';

export const Container = styled.div`

    font-family: sans-serif;
    width: 366px;
    margin: 100px auto;
    text-align: center;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    

    div{
        width: 100%;
    }
    
`

export const Logo = styled.label`

    img {
    height: 100px;
        object-fit: cover;
    }
`;

export const StyledInput = styled.input`

    width: 99%;
    height: 52px;
    border-radius: 5px;
    display: block;
    margin-bottom: 12px;
    border: solid 1px #010101;
    font-size: 15px;

    input:focus{
        border-color: blue;
    }

    input[type=text]{
        padding: 11px 3px 1px 3px;
    }
    
`;

export const StyledHeader = styled.header`

    h1 {
        background-color: #ebfbff;
        color: black;
        text-align: center;
    }
`

export const StyledButton = styled.button`

    width: 100%;
    padding-top: 13px;
    padding-bottom: 13px;
    max-height: 46px;
    background-image: linear-gradient(90deg, rgba(63,82,251,1) 0%, rgba(252,70,107,1) 100%);
    font-size: 15px;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover{
        opacity: 85%;
    }
`

export const StyledErrMessage = styled.label`

    h1{
        text-align:left;
        font-size: 14px;
        font-weight: 100;
        color: #D15B5B;
    }
    h3 {
        padding: ${(props) => props.value ? '8px 0' : '0'};
        border-style: solid;
        border-width: ${(props) => props.value ? '1px' : '0'};
        border-color: ${(props) => props.error ? '#AFAFFF' : '#FF0000'};
        border-radius: 3px;
        background-color: ${(props) => props.error ? '#D0DEFF' : '#FFCECE'};
        font-size: 14px;
        font-weight: 100;
        width:100%;
        color: #2E2E2E;
        text-align: center;
    }
`

export const StyledLink = styled.a`

    text-align: center;
    display: block;
    margin-top: 20px;
    color: #626262;
    cursor: pointer;
    transition: color 0.1s ease-in-out;

    &:hover {
        color: #1844c4;
    }
`;

export const ErrorContainer = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
`;
