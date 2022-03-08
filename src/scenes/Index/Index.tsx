
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getPath } from '../../pages/routes';

const Index = ({ history }):JSX.Element => (
        <>
            <h1>INDEX</h1>
            <button onClick={() => history.push(getPath("login"))}>Login</button>
            <button onClick={() => history.push( getPath("user", {id: 1}) )}>Profil</button>
            <button onClick={() => history.push( getPath("admin_index") )}>Admin</button>
        </>
);

export default withRouter(Index);