import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './Todo';
import Footer from './Footer';
import { ALL_TODOS, COMPLETED_TODOS } from '../utils/constants';

function TodoList(props) {
  const {
    todos,
    filter,
    changeTodo,
    removeTodo,
    filterTodos,
    clearTodos,
  } = props;

  let todoList = Object.values(todos);

  if (filter !== ALL_TODOS) {
    todoList = todoList.filter(todo => (filter === COMPLETED_TODOS ? todo.isCompleted : !todo.isCompleted));
  }

  return (
    <>
      {todoList.length > 0 && (
        <>
          <ul className={styles.todoList}>
            {todoList.map(todoItem => (
              <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                todo={todoItem.todo}
                isCompleted={todoItem.isCompleted}
                changeTodo={changeTodo}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
          <Footer
            filter={filter}
            filterTodos={filterTodos}
            clearTodos={clearTodos}
            itemsLeft={this.itemsLeft}
          />
        </>
      )}
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  changeTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
