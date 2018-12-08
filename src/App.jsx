import React from 'react';
import TodoInput from './components/TodoInput';
import styles from './assets/css/app.css';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>todos</h1>
      <TodoInput />
    </div>
  );
}

export default App;
