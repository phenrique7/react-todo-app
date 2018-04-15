import React, { Component } from 'react';
import TodoList from './TodoList';
import Footer from "./Footer";

class App extends Component {

    render() {
        return (
            <div>
                <TodoList/>
                <Footer/>
            </div>
        );
    }

}

export default App;
