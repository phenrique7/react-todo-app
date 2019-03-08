import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import TodoList from './TodoList';
import { ALL_TODOS, STORAGED_TODOS } from '../utils/constants';
import {
  getItemStorage,
  immutableRemoveObjectProperty,
  isEmptyObject,
  removeItemStorage,
  setItemStorage,
} from '../utils/functions';
import styles from '../assets/css/todo.css';

function getStoragedTodos() {
  const storagedTodos = getItemStorage(STORAGED_TODOS);
  return JSON.parse(storagedTodos);
}

function setStorageTodos(currentTodos) {
  const storagedTodos = getStoragedTodos();
  let stringifyedTodos = {};

  if (storagedTodos === null) {
    stringifyedTodos = JSON.stringify({});
  } else {
    const changedTodos = Object.assign(storagedTodos, currentTodos);
    stringifyedTodos = JSON.stringify(changedTodos);
  }

  setItemStorage(STORAGED_TODOS, stringifyedTodos);
}

function TodoContainer() {
  const [state, setState] = useState({
    todo: '',
    completed: false,
    filter: ALL_TODOS,
    todos: {},
  });

  useEffect(() => {
    setStorageTodos(state.todos);

    return () => {
      removeItemStorage(STORAGED_TODOS);
    };
  }, [state.todos]);

  const handleChangeTodo = (ev) => {
    setState({ todo: ev.target.value });
  };

  const completeAllTodos = () => {
    function completeTodos(status) {
      const todosEntries = Object.entries(state.todos);

      const todos = todosEntries.reduce((acc, value) => {
        const [key, todoContent] = value;

        return {
          ...acc,
          [key]: {
            ...todoContent[key],
            isCompleted: status,
          },
        };
      }, {});

      return todos;
    }

    const todos = state.completed
      ? completeTodos(false)
      : completeTodos(true);

    setState({ todos });
  };

  const submitTodo = (event) => {
    const { todo } = state;

    if (event.key === 'Enter' && todo.trim().length > 0) {
      const todoId = shortid.generate();

      setState({
        todo: '',
        todos: {
          ...state.todos,
          [todoId]: { id: todoId, todo, isCompleted: false },
        },
      });
    }
  };

  const clearTodos = () => {
    const { todos } = state;
    let changedTodos = {};

    Object.keys(todos).forEach((todoKey) => {
      changedTodos = immutableRemoveObjectProperty(changedTodos, todoKey);
    });

    setState({ todos: changedTodos });
  };

  const { todo, completed, todos } = state;

  return (
    <section className={styles.todoApp}>
      {isEmptyObject(todos) > 0 && (
        <span
          className={completed ? styles.todosChecked : styles.checkAll}
          onClick={completeAllTodos}
        />
      )}
      <input
        type="text"
        className={styles.todoInput}
        placeholder="What needs to be done?"
        onChange={handleChangeTodo}
        onKeyPress={submitTodo}
        value={todo}
      />
      <TodoList todos={todos} />
    </section>
  );
}

class Todo extends React {
  changeTodo(todoId, property, value) {
    if (this.filter !== 'all' && property === 'isCompleted') {
      this.todos = {
        ...this.todos,
        [todoId]: { ...this.todos[todoId], [property]: value },
      };

      this.filterTodos(this.filter);
    } else {
      const { currentTodos } = this.state;
      const changedTodos = {
        ...currentTodos,
        [todoId]: { ...currentTodos[todoId], [property]: value },
      };

      if (state.completed) {
        this.checked = true;
      } else if (this.checked) {
        this.checked = false;
      }

      this.setState({ currentTodos: changedTodos });
    }
  }

  removeTodo(todoId) {
    if (this.filter !== 'all') {
      this.todos = immutableRemoveObjectProperty(this.todos, todoId);
      this.filterTodos(this.filter);
    } else {
      const { currentTodos } = this.state;
      const changedTodos = immutableRemoveObjectProperty(
        currentTodos,
        todoId,
      );

      if (state.completed) {
        this.checked = true;
      }

      this.setState({ currentTodos: changedTodos });
    }
  }

  filterTodos(selectedFilter) {
    if (this.filter === 'all') {
      const { currentTodos } = this.state;
      this.todos = Object.assign({}, currentTodos);
    }

    this.filter = selectedFilter;

    if (selectedFilter === 'all') {
      if (Todo.areAllTodosChecked(this.todos)) {
        this.checked = true;
      } else if (this.checked) {
        this.checked = false;
      }

      this.setState({
        currentTodos: Object.assign({}, this.todos),
      });

      this.todos = {};
    } else {
      const filteredTodos = {};

      if (selectedFilter === 'active') {
        Object.values(this.todos).forEach((todo) => {
          if (!todo.isCompleted) {
            filteredTodos[todo.id] = Object.assign({}, todo);
          }
        });
      } else if (selectedFilter === 'completed') {
        Object.values(this.todos).forEach((todo) => {
          if (todo.isCompleted) {
            filteredTodos[todo.id] = Object.assign({}, todo);
          }
        });
      }

      if (Todo.areAllTodosChecked(filteredTodos)) {
        this.checked = true;
      } else if (this.checked) {
        this.checked = false;
      }

      setState({ todos: filteredTodos });
    }
  }

  itemsLeft() {
    let todosArray;

    if (isEmptyObject(this.todos)) {
      const { currentTodos } = this.state;
      todosArray = Object.values(currentTodos);
    } else {
      todosArray = Object.values(this.todos);
    }

    let numberCompletedTodos = 0;

    todosArray.forEach((todo) => {
      if (todo.isCompleted) {
        numberCompletedTodos += 1;
      }
    });

    return todosArray.length - numberCompletedTodos;
  }
}

export default TodoContainer;
