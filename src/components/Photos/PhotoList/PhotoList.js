import React from 'react';

import './PhotoList.css'

const PhotoList = React.memo((props) => {
    return (
            <div className="photos-list" >
                {props.photos.map(photo => (
                    <img 
                        key= {photo.image_id} 
                        onClick ={props.openModalComments.bind(this, photo.image_id)}
                        src={photo.src} 
                        alt ={photo.image_id} />
                ))}
            </div>
    )
});

export default PhotoList;