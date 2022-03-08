import * as React from 'react';
import Login from '../scenes/Login/Login';
import Index from '../scenes/Index/Index';
import Admin from '../scenes/Admin/Admin';
import User from '../scenes/User/User';
import AdminDashboard from '../scenes/Admin/AdminDashboard/AdminDashboard';
import AdminUsers from '../scenes/Admin/AdminUsers/AdminUsers';

type Route = {
    name?: string,
    path: string,
    component?: React.ReactElement,
    roles?: string[],
    routes?: Route[],
};

const routes: Array<Route> = [
    {
        'name': 'login',
        'path': '/login',
        'component': Login,
        'roles': ['ROLE_USER'],
    },
    {
        'name': 'index',
        'path': '/',
        'component': Index,
        'roles': ['ROLE_USER'],
    },
    {
        'path': '/admin',
        'roles': ['ROLE_USER', 'ROLE_ADMIN'],
        'routes': [
            {
                'name': 'admin_index',
                'path': '',
                'component': Admin,
            },
            {
                'name': 'admin_dashboard',
                'path': '/dashboard',
                'component': AdminDashboard,
            },
            {
                'name': 'admin_users',
                'path': '/users',
                'component': AdminUsers,
                'roles': ['ROLE_USER', 'ROLE_ADMIN'],
            },
        ],
    },
    {
        'name': 'user',
        'path': '/user/:id',
        'component': User,
        'roles': ['ROLE_USER'],
    },
];

const compile = (parentRoute: Route, subRoutes: Route[]): Route[] => {
    return subRoutes.flatMap(subRoute => {
        const newRoute: Route = {
            name: subRoute.name,
            path: parentRoute.path + subRoute.path,
            component: subRoute.component,
            roles: (parentRoute.roles || []).concat((subRoute.roles || [])),
        };
        return (subRoute.routes) ? [...compile(newRoute, subRoute.routes)] : newRoute;
    });
}

const getRoutes = () => {
    const parentRoute = {
        'name': '',
        'path': '',
    };
    const flatRoutes = compile(parentRoute, routes);
    return flatRoutes;
}

const getPath = (name: string, params: Object = null) => {
    const routeFound = getRoutes().find(route => route.name === name);
    let path = routeFound ? routeFound.path : null;
    if (path && params) {
        Object.entries(params).forEach(([key, value]: [string, any]) => {
            path = path ? path.replace(`:${key}`, value) : '';
        });
    }
    return path;
}

export {
    getRoutes,
    getPath,
}