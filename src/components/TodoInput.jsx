import React from 'react';
import styles from '../assets/css/todo.css';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  render() {
    return (
      <section className={styles.todoApp}>
        <span className={styles.checkAll} />
        <input
          type="text"
          className={styles.todoInput}
          placeholder="What needs to be done?"
        />
      </section>
    );
  }
}

export default TodoInput;
