import React from 'react';
import shortid from 'shortid';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import { immutableRemoveObjectProperty } from '../utils';
import styles from '../assets/css/todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.filter = 'all';
    this.checked = false;
    this.allTodos = {};

    this.state = {
      todo: '',
      todos: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkAllTodos = this.checkAllTodos.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ todo: value });
  }

  checkAllTodos() {
    const { todos } = this.state;
    const checkedTodos = {};
    const todosKeys = Object.keys(todos);

    todosKeys.forEach((todoKey) => {
      checkedTodos[todoKey] = {
        ...todos[todoKey],
        isCompleted: !this.checked,
      };
    });

    this.setState({ todos: checkedTodos }, () => {
      this.checked = !this.checked;
    });
  }

  submitTodo(event) {
    const { todo } = this.state;

    if (event.key === 'Enter' && todo.trim().length > 0) {
      const todoId = shortid.generate();

      if (this.filter !== 'all') {
        this.allTodos = {
          ...this.allTodos,
          [todoId]: { id: todoId, todo, isCompleted: false },
        };

        this.filterTodos(this.filter);
      } else {
        this.setState(state => ({
          todo: '',
          todos: {
            ...state.todos,
            [todoId]: { id: todoId, todo, isCompleted: false },
          },
        }));
      }
    }
  }

  changeTodo(todoId, property, value) {
    if (this.filter !== 'all' && property === 'isCompleted') {
      this.allTodos = {
        ...this.allTodos,
        [todoId]: { ...this.allTodos[todoId], [property]: value },
      };

      this.filterTodos(this.filter);
    } else {
      this.setState(state => ({
        todos: {
          ...state.todos,
          [todoId]: { ...state.todos[todoId], [property]: value },
        },
      }));
    }
  }

  removeTodo(todoId) {
    if (this.filter !== 'all') {
      this.allTodos = immutableRemoveObjectProperty(this.allTodos, todoId);
      this.filterTodos(this.filter);
    } else {
      const { todos } = this.state;

      this.setState({
        todos: immutableRemoveObjectProperty(todos, todoId),
      });
    }
  }

  filterTodos(filter) {
    if (this.filter === 'all') {
      const { todos } = this.state;
      this.allTodos = Object.assign({}, todos);
    }

    this.filter = filter;

    if (filter === 'all') {
      this.setState({
        todos: Object.assign({}, this.allTodos),
      });
    } else {
      const filteredTodos = {};

      if (filter === 'active') {
        Object.values(this.allTodos).forEach((todo) => {
          if (!todo.isCompleted) {
            filteredTodos[todo.id] = Object.assign({}, todo);
          }
        });
      } else if (filter === 'completed') {
        Object.values(this.allTodos).forEach((todo) => {
          if (todo.isCompleted) {
            filteredTodos[todo.id] = Object.assign({}, todo);
          }
        });
      }

      this.setState({ todo: '', todos: filteredTodos });
    }
  }

  render() {
    const { todo, todos } = this.state;
    const todoList = Object.values(todos);

    return (
      <section className={styles.todoApp}>
        <span className={styles.checkAll} onClick={this.checkAllTodos} />
        <input
          type="text"
          className={styles.todoInput}
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          onKeyPress={this.submitTodo}
          value={todo}
        />
        {(todoList.length > 0 || this.filter !== 'all') && (
          <>
            <ul className={styles.todoList}>
              {todoList.map(todoItem => (
                <TodoItem
                  key={todoItem.id}
                  id={todoItem.id}
                  todo={todoItem.todo}
                  isCompleted={todoItem.isCompleted}
                  changeTodo={this.changeTodo}
                  removeTodo={this.removeTodo}
                />
              ))}
            </ul>
            <TodoFooter
              filter={this.filter}
              filterTodos={this.filterTodos}
            />
          </>
        )}
      </section>
    );
  }
}

export default Todo;
