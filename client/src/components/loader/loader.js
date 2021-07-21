import React from 'react';
import classes from './loader.module.css';
import BdGalaxy from '../uInteface/backdrop/bd-galaxy';
import BdWhite from '../uInteface/backdrop/bd-white';

const loader = (props) => {

    switch (props.bg) {
        case 'white': default:
            return (
                <React.Fragment>
                    <BdWhite>
                        <div className={[classes.loader, "position-absolute top-50 start-50 translate-middle"].join(" ")}></div>
                    </BdWhite>
                </React.Fragment>
            );
        case 'image':
            return (
                <React.Fragment>
                    <BdGalaxy>
                        <div className={[classes.loader, "position-absolute top-50 start-50 translate-middle"].join(" ")}></div>
                    </BdGalaxy>
                </React.Fragment>
            );
    }
};

export default loader;