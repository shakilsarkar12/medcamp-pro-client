import React from 'react';
import UserFeedbackForm from './UserFeedbackForm';
import { useParams } from 'react-router';

const Feedback = () => {
    const {id} = useParams();
    return (
        <div>
            <UserFeedbackForm campId={id}/>
        </div>
    );
};

export default Feedback;<UserFeedbackForm/>