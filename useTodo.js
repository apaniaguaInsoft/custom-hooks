import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = (initialState = []) => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);



    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        };

        dispatchTodo(action);
    };

    const handleDeleteTodo = (todo) => {
        const action = {
            type: 'Remove Todo',
            payload: todo.id
        };

        dispatchTodo(action);
    };

    const handleToggleTodo = (id) => {
        const action = {
            type: 'Toggle Todo',
            payload: id
        };

        dispatchTodo(action);
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(p => !p.done).length
    }
}
