import React from 'react';
import { connect } from 'react-redux';

const Footer = ({ todos }) => (
    <h4>Você tem { todos.length } todos.</h4>
);

const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(mapStateToProps)(Footer);