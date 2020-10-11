import React from 'react';
import './App.css';
import {TaskForm} from "./forms/TaskForm";
import {Container} from "@material-ui/core";

function App() {
    return (
        <Container className="App">
            <TaskForm/>
        </Container>
    );
}

export default App;
