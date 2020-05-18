import React from 'react';
//import './Person.css';
import styled from 'styled-components';


const StyledDiv = styled.div`
     width: 80%;
     margin: 16px;
     border: 2px solid green;
     box-shadow: 0 2px 3px rgb(66, 32, 218);
     padding: 26px;
     text-align: center;
 
     @media(min-width: 500px) {
      width:450px;
     
 }`;
const person = (props) => {
     // const styles = {
     //      '@media (min-width: 500px)': {
     //           width: '450px'
     //      }
     // };
     return(
          //<div className = "Person" style={styles}>
         <StyledDiv>
          <p onClick = {props.click}>I'm {props.name} and I am {props.age} years old!</p>
          <p>{props.children}</p>
          <input type = "text"
           onChange = {props.changed}
            value = {props.name}/>
            </StyledDiv>
          )
}


export default person;