
import React from 'react';

type Props = {
    location: { pathname: string }
};

const NotFound = ({ location } : Props) => {
    return (
        <p>Page not found for {location.pathname} !</p>
    )
}

export default NotFound;