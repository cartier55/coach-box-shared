import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProfilePictureViewer = ({ src, size = 100, alt = "Profile Picture" }) => {
    const style = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Image src={src} alt={alt} style={style} />
        </div>
    );
};

ProfilePictureViewer.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    alt: PropTypes.string
};

export default ProfilePictureViewer;
