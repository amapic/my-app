// @flow

export function hasRoles(roles: string[]) {
    const userRoles = ["ROLE_USER", "ROLE_ADMIN"];
    return roles.every(role => userRoles.includes(role));
}
