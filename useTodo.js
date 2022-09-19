import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const [counter, setCounter ] = useState({
        todoCount: 0,
        pendingTodosCount: 0
    });


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos.length);
        setCounter({
            todoCount: todos.length,
            pendingTodosCount: todos.filter( todo => !todo.done).length
        })
    }, [todos]);
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };

        dispatch( action )

        console.log( todos );
    };

    const handleOnDeleteTodo = ( id ) => {
        // console.log(id);
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        };

        dispatch( action );
    }

    const handleToggleTodo = ( id ) => {       
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        };

        dispatch( action );
    }

    return {
        todos,
        handleNewTodo,
        handleOnDeleteTodo,
        handleToggleTodo,
        ...counter
    }
}