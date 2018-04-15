import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoActions from '../actions/todos'

const TodoList = ({ todos, addTodo}) => {
    let input;

    return(
        <div>
            <ul>
                {
                    todos.map(todo => (
                        <li key={ todo.id } >{ todo.text }</li>
                    ))
                }
            </ul>
            <form onSubmit={e => {
                e.preventDefault();
                if (!input.value.trim()) {
                    return;
                }
                addTodo(input.value);
                input.value = '';
            }}>
                <input ref={node => input = node} />
                <button type="submit">
                    Novo Todo
                </button>
            </form>
        </div>
    );

};

const mapStateToProps = state => ({
   todos: state.todos
});

const mapDispatchToProps = dispatch => bindActionCreators(todoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);