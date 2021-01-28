import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';

import CommentsForm from './CommentsForm/CommentsForm';
import './Comments.css'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

function Comments(props) {
    const { imageId } = props;
    const [imageUrl, setImageUrl] = useState();
    const [comments, setComments] = useState();

    const [isPhotoError, setIsPhotoError] = useState(null);
    const [isCommentsError, setIsCommentsError] = useState(null);

    useEffect(() => {
        axios.get(`https://tzfrontend.herokuapp.com/images/${imageId}`)
            .then(response => setImageUrl(response.data.src))
            .catch(error => setIsPhotoError('Photo is not loaded...'))
    }, [imageId]);

    useEffect(() => {
        axios.get(`https://tzfrontend.herokuapp.com/comments/${imageId}`)
            .then(response => setComments(response.data))
            .catch(error => setIsCommentsError('Comments are not loaded'))
    }, [imageId]);

    const addedCommentHandler = useCallback((commentData) => {
        setComments([
            ...comments,
            { id: commentData.name, ...commentData }
        ])
    }, [comments]);

    const form = useMemo(() => {
        return (
            <CommentsForm addedCommentHandler={addedCommentHandler} imageId={imageId} />
        )
    }, [addedCommentHandler, imageId]);

    return (
        <>
            {isCommentsError ? <ErrorMessage>{isCommentsError}</ErrorMessage> :
                (
                    <>
                        <div>
                            {isPhotoError ? <div className='error' >{isPhotoError}</div> : <img className='photo' src={imageUrl} alt={imageUrl} />}
                            <div className='description'>
                                {comments && comments.detail ? <p className='noComment'>{comments.detail}</p> : null}
                                {comments && !comments.detail ? comments.map(comment => {
                                    return (
                                        <div className='comment-block' key={comment.id}>
                                            <p className='name'>{comment.name} :</p>
                                            <p className='comment'>{comment.description}</p>
                                        </div>)
                                }) : null}
                            </div>
                        </div>
                        {form}
                    </>
                )}
        </>
    );
}

export default Comments;