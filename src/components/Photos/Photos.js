import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';

import PhotoList from './PhotoList/PhotoList';
import Modal from '../UI/Modal/Modal';
import Comments from '../Comments/Comments';
import ErrorMessage  from '../UI/ErrorMessage/ErrorMessage';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [imageId, setImageId] = useState();

    const [isError, setIsError] = useState(null)

    useEffect(() => {
        axios.get('https://tzfrontend.herokuapp.com/images')
            .then(response => {
                setPhotos(response.data);
            })
            .catch(error => {
                setIsError('Something went wrong...')
            } )
    }, []);

    const onOpenModalHandler = useCallback((imageId) => {
        setIsOpen(true);
        setImageId(imageId)
    }, []);

    const onClosedModal = useCallback(() => {
        setIsOpen(false);
        setImageId(null)
    }, []);

    const photoList = useMemo(() => {
        return (
            <PhotoList photos={photos} openModalComments={onOpenModalHandler} />
        )
    }, [photos, onOpenModalHandler]);

    const modal = useMemo(() => {
        return (
            <Modal show={isOpen} modalClosed={onClosedModal}>
                {imageId && <Comments imageId={imageId} />}
            </Modal>
        )
    }, [isOpen, onClosedModal, imageId]);

    return (
        <>
        {isError ? <ErrorMessage>{isError}</ErrorMessage> : (<div> 
            {photoList}
            {modal}
        </div>)}
        </>
    )
};

export default Photos;