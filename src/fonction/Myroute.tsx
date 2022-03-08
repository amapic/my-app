import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isAuth } from 'services/security/isAuth';
// import { hasRoles } from 'services/security/hasRoles';

export function hasRoles(roles: string[]) {
    const userRoles = ["ROLE_USER", "ROLE_ADMIN"];
    return roles.every(role => userRoles.includes(role));
}
export function isAuth() {
    return true;
}

type Props = {
    component: any,
    roles: Array<string>,
    path: string,
};

export default function MyRoute ({ component: Component, roles, path } : Props) :JSX.Element {
    return (
        <Route
        path={path}
        exact={true}
        render={(props) => 
            (roles === undefined || (isAuth() && hasRoles(roles))) ? (
                <Component {...props} />
            ) : (
                isAuth() ? (
                    <Redirect to="/" />
                ) : (
                    <Redirect to="/login" />
                )
            )
        }
        />
    );
}

