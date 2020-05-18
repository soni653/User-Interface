import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
 state = {
    persons: [
      {id:'abcd', name: 'Dave', age: 30} ,
      {id:'pqrs1',name:'Prapti', age: 20},
      {id:'wxyz123',name: 'Master', age: 45}
    ],
    otherState: 'some other value',
    showPersons:false
    
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person ={ 
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons} );
  }

  deletePersonHandler  = (personIndex) => {
      const persons = [...this.state.persons]
      persons.splice(personIndex, 1);
      this.setState({persons: persons})
}
  
  togglePersonsHandler = () => {

  const doesShow =this.state.showPersons;
  this.setState({showPersons: !doesShow});

  }
  render(){
    const style = {
      backgroundColor: 'orange',
      color:'white',
      font: 'inherit',
      border: '1px solid red',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'red',
        color:'yellow'
      }
    };

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
        {this.state.persons.map((person, index )=> {
          return <Person
          click = {() => this.deletePersonHandler(index)}
           name = {person.name} 
           age = {person.age} 
           key = {person.id}
           changed = {(event) => this.nameChangeHandler(event, person.id)}/>
        })}
        </div> 
      );
      // style.backgroundColor = 'blue';
      // style[':hover'] = {
      //   backgroundColor: 'purple',
      //   color:'beige'
      // };
    }

    const classes = [];
    if(this.state.persons.length <=2){
      classes.push('para');//name of the class = ['para']
    }
    if(this.state.persons.length <=1){
      classes.push('thick');//name of the classs = ['para',thick']
    }

return (

      <div className="App">
        <h1> Hi, I'm a React App</h1>
        <p className = {classes.join(' ')}>This is really working!</p>
        <StyledButton alt={this.state.showPersons}
        onClick = {this.togglePersonsHandler}>Toggle Persons
        </StyledButton>
        {persons}
         </div>
        
        );
   //return React.createElement('div',null, React.createElement('h1',{className: 'App'},'Does this work now?'))
}
  }


export default App;


