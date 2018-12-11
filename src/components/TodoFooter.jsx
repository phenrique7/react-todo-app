import React from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/css/todo-footer.css';

function TodoFooter({ filter, filterTodos }) {
  function handleClick({ target: { name } }) {
    if (name === 'button-all' && filter !== 'all') {
      filterTodos('all');
    } else if (name === 'button-active' && filter !== 'active') {
      filterTodos('active');
    } else if (
      name === 'button-completed'
      && filter !== 'completed'
    ) {
      filterTodos('completed');
    } else {
      // clearAll();
    }
  }

  return (
    <footer className={styles.footer}>
      <p>item left</p>
      <ul>
        <li
          onClick={handleClick}
          className={filter === 'all' ? styles.activeButton : ''}
        >
          <button type="button" name="button-all">
            All
          </button>
        </li>
        <li
          onClick={handleClick}
          className={
            filter === 'active' ? styles.activeButton : ''
          }
        >
          <button type="button" name="button-active">
            Active
          </button>
        </li>
        <li
          onClick={handleClick}
          className={
            filter === 'completed' ? styles.activeButton : ''
          }
        >
          <button type="button" name="button-completed">
            Completed
          </button>
        </li>
      </ul>
      <button type="button" name="button-clear" onClick={handleClick}>
        Clear all
      </button>
    </footer>
  );
}

TodoFooter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

export default TodoFooter;
