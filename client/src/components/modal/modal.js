import React from 'react'
import { Modal } from 'react-bootstrap';
import classes from './modal.module.css';
const UserEdit = React.lazy(() => import('../../pages/portal/management/userEdit/userEdit'));
const CEdit = React.lazy(() => import('../../pages/portal/curriculum/editCurriculum/cEdit'));

const ModalBackdrop = (props) => {

    let component = null;
    let title = null;

    switch (props.type) {
        case 'UserEdit': case 'ClientEdit':
            component = <UserEdit user={props.user} onHide={props.onHide} />; title = "Edit Profile"; break;
        case 'CEdit':
            component = <CEdit details={props.details} onHide={props.onHide} />; title = "Edit Curriculum"; break;
        default: break;
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title className={classes.modalHeader} id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {component}
            </Modal.Body>
        </Modal>
    );
}

export default ModalBackdrop;