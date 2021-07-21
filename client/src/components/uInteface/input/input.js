import React from 'react';
// import classes from './input.module.css';

const input = (props) => {
    const classAssign = ["form-control", props.classassign].join(' ');
    // classes.input
    let inputElement = null;
    switch (props.inputtype) {
        case 'input':
            inputElement = <input className={classAssign}{...props} />
            break;
        case 'textarea':
            inputElement = <textarea className={classAssign}{...props} />
            break;
        case 'name':
            inputElement = (
                <div class="input-group">
                    <input type="text" placeholder="First Name" className={classAssign}{...props} />
                    <input type="text" placeholder="Last Name" className={classAssign}{...props} />
                </div>
            )
            break;
        default:
            inputElement = <input className={classAssign}{...props} />
            break;
    }
    return (
        <React.Fragment>
            {inputElement}
        </React.Fragment>
    );
};

export default input;