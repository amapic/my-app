
import React,{ReactElement} from 'react';

type Props = {
    match: { 
        params: {
            id: number
        }
    }
};

const User = (props : Props):ReactElement => {
    return (
        <h1>User {props.match.params.id}</h1>
    )
}

export default User;