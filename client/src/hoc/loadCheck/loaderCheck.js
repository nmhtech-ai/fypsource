import React, { useState, useEffect } from 'react';
import Loader from '../../components/loader/loader';

const LoaderCheck = (props) => {
    const [isLoading, setLoader] = useState(true);

    useEffect(() => {
        setLoader(false);
    }, [])

    return (
        <div>
            {isLoading && <Loader bg={props.bg} />}
            {!isLoading && props.children}
        </div>
    );
};

export default LoaderCheck;