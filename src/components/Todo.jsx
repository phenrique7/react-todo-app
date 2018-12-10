import React from 'react';
import shortid from 'shortid';
import styles from '../assets/css/todo.css';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      todos: {},
      checked: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkAllTodos = this.checkAllTodos.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ todo: value });
  }

  checkAllTodos() {
    const { todos, checked } = this.state;
    const checkedTodos = {};
    const todosKeys = Object.keys(todos);

    todosKeys.forEach((todoKey) => {
      checkedTodos[todoKey] = {
        ...todos[todoKey],
        isCompleted: !checked,
      };
    });

    this.setState(state => ({
      todos: checkedTodos,
      checked: !state.checked,
    }));
  }

  submitTodo(event) {
    if (event.key === 'Enter') {
      const { todo } = this.state;
      const todoId = shortid.generate();

      this.setState(state => ({
        todo: '',
        todos: {
          ...state.todos,
          [todoId]: { id: todoId, todo, isCompleted: false },
        },
      }));
    }
  }

  changeTodo(todoId, property, value) {
    this.setState(state => ({
      todos: {
        ...state.todos,
        [todoId]: { ...state.todos[todoId], [property]: value },
      },
    }));
  }

  removeTodo(todoId) {
    const { todos } = this.state;

    const newTodos = Object.keys(todos).reduce(
      (result, item, index, array) => {
        if (item !== todoId) {
          return Object.assign({}, result, {
            [array[index]]: todos[item],
          });
        }
        return Object.assign({}, result);
      },
      {},
    );

    this.setState({ todos: newTodos });
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
        {todoList.length > 0 && (
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
            <TodoFooter />
          </>
        )}
      </section>
    );
  }
}

export default Todo;
