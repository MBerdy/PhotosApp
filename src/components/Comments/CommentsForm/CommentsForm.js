import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

import './CommentsForm.css';

function CommentsForm(props) {
    const [enteredName, setEnteredName] = useState('');
    const [enteredComment, setEnteredComment] = useState('');
    const inputRef = useRef();

    const [disable, setDisable] = useState(true);
    const [error, setError] = useState(null);
    const firstRender = useRef(true)

    const formValidation = useCallback(() => {
        if (enteredName === '' || enteredComment === '') {
            setError('Заполните все поля')
            return true
        } else  {
            setError(null);
            return false
        }
    }, [enteredName, enteredComment]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        setDisable(formValidation())
    }, [enteredName, enteredComment, formValidation]);

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const onSubmitFormHandler = (event) => {
        event.preventDefault();
        const commentData = {
            name: enteredName,
            description: enteredComment,
            image_id: props.imageId
        }
        axios.post('https://tzfrontend.herokuapp.com/comments/add/', commentData)
            .then(response => {
                setEnteredName('');
                setEnteredComment('');
                props.addedCommentHandler(commentData);
                inputRef.current.focus()
            })
    };
    
    return (
        <form className='form' onSubmit={(e) => onSubmitFormHandler(e)}>
            <input
                ref={inputRef}
                type='text'
                placeholder='Ваше имя'
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)} />
            <input
                type='text'
                placeholder='Ваш комментарий'
                value={enteredComment}
                onChange={(event) => setEnteredComment(event.target.value)} />
            {error && <p className='error'>{error}</p> }
            <button type="submit" disabled={disable}>Оставить комментарий</button>
        </form>
    )
}

export default CommentsForm;