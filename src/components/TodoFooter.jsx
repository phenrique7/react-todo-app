import React from 'react';
import styles from '../assets/css/todo-footer.css';

class TodoFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonActive: 'all',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    const { buttonActive } = this.state;

    if (name === 'button-all' && buttonActive !== 'all') {
      this.setState({ buttonActive: 'all' });
    } else if (name === 'button-active' && buttonActive !== 'active') {
      this.setState({ buttonActive: 'active' });
    } else if (
      name === 'button-completed'
      && buttonActive !== 'completed'
    ) {
      this.setState({ buttonActive: 'completed' });
    } else {
      // this.setState({ buttonActive: 'all' });
    }
  }

  render() {
    const { buttonActive } = this.state;

    return (
      <footer className={styles.footer}>
        <p>item left</p>
        <ul>
          <li
            onClick={this.handleClick}
            className={buttonActive === 'all' ? styles.activeButton : ''}
          >
            <button type="button" name="button-all">
              All
            </button>
          </li>
          <li
            onClick={this.handleClick}
            className={
              buttonActive === 'active' ? styles.activeButton : ''
            }
          >
            <button type="button" name="button-active">
              Active
            </button>
          </li>
          <li
            onClick={this.handleClick}
            className={
              buttonActive === 'completed' ? styles.activeButton : ''
            }
          >
            <button type="button" name="button-completed">
              Completed
            </button>
          </li>
        </ul>
        <button type="button" name="button-clear">
          Clear all
        </button>
      </footer>
    );
  }
}

export default TodoFooter;
