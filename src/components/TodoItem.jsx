import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../assets/svg/close-icon.svg';
import styles from '../assets/css/todo-item.css';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    const { todo } = this.props;

    this.state = {
      todoEdited: todo,
      isTodoBeingEdited: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitTodoEdited = this.submitTodoEdited.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleCheckTodo = this.handleCheckTodo.bind(this);
  }

  handleCheckTodo() {
    const { id, isCompleted, changeTodo } = this.props;

    changeTodo(id, 'isCompleted', !isCompleted);
  }

  handleChange({ target: { value } }) {
    this.setState({ todoEdited: value });
  }

  submitTodoEdited(event) {
    if (event.key === 'Enter') {
      const { todo } = this.state;
      const { id, changeTodo } = this.props;

      changeTodo(id, 'todo', todo);
    }
  }

  handleDoubleClick() {
    const { isTodoBeingEdited } = this.state;

    if (!isTodoBeingEdited) {
      this.setState({ isTodoBeingEdited: true });
    }
  }

  render() {
    const { isTodoBeingEdited, todoEdited } = this.state;
    const { todo, isCompleted } = this.props;

    return (
      <li
        className={styles.todoItem}
        onDoubleClick={this.handleDoubleClick}
      >
        <input
          type="checkbox"
          name="todo-check"
          style={{ display: 'none' }}
          onChange={this.handleChange}
        />
        <span
          onClick={this.handleCheckTodo}
          className={
            isCompleted
              ? styles.todoCheckmarked
              : styles.todoCheckmark
          }
        />
        {isTodoBeingEdited ? (
          <input
            type="text"
            name="todo-edited"
            onChange={this.handleChange}
            onKeyPress={this.submitTodoEdited}
            value={todo !== todoEdited ? todoEdited : todo}
            className={styles.todoEdited}
          />
        ) : (
          <p
            className={
              isCompleted ? styles.todoCompleted : styles.todo
            }
          >
            {todo}
          </p>
        )}
        <div className={styles.todoCloseIcon}>
          <img src={CloseIcon} alt="Remove todo" width={27} />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  todo: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  changeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
