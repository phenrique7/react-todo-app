import React from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/css/todo-item.css';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTodoBeingEdited: false,
    };
  }

  handleChange({ target: { value } }) {
    console.log('value', value);
    // this.setState({ todo: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { todo } = this.state;
    const { id, changeTodo } = this.props;

    changeTodo(id, 'todo', todo);
  }

  render() {
    const { isTodoBeingEdited } = this.state;
    const { todo, isCompleted } = this.props;

    return (
      <div className={styles.todoItem}>
        <input type="checkbox" name="todo-checked" />
        {isTodoBeingEdited ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="submit"
              name="todo-edited"
              onChange={this.handleChange}
              className={
                isCompleted ? styles.todoCompleted : styles.todo
              }
            />
          </form>
        ) : (
          <p>{todo}</p>
        )}
      </div>
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
