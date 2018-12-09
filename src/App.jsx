import React from 'react';
import Todo from './components/Todo';
import styles from './assets/css/app.css';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>todos</h1>
      <Todo />
    </div>
  );
}

export default App;
