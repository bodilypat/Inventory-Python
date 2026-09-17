/* ************************************************** */
/* File: src/features/auth/utils/permissionHelpers.js */
/* ************************************************** */
import { ROLES } from '../constants/roles';

export const hasRole = (user, roles) => {
  if (!user) return false;

  const allowedRoles = Array.isArray(roles)
    ? roles
    : [roles];

  return allowedRoles.includes(user.role);
};

export const hasPermission = (user, permission) => {
  if (!user) return false;

  // Administrators have every application permission.
  if (user.role === ROLES.ADMIN) {
    return true;
  }

  return user.permissions?.includes(permission) ?? false;
};

export const hasAnyPermission = (
  user,
  permissions
) => {
  if (!user || !Array.isArray(permissions)) {
    return false;
  }

  return permissions.some((permission) =>
    hasPermission(user, permission)
  );
};

export const hasAllPermissions = (
  user,
  permissions
) => {
  if (!user || !Array.isArray(permissions)) {
    return false;
  }

  return permissions.every((permission) =>
    hasPermission(user, permission)
  );
};

export const canAccess = ({
  user,
  roles,
  permissions,
  requireAllPermissions = false,
}) => {
  if (!user) return false;

  const roleAllowed =
    !roles || hasRole(user, roles);

  if (!roleAllowed) return false;

  if (!permissions) return true;

  return requireAllPermissions
    ? hasAllPermissions(user, permissions)
    : hasAnyPermission(user, permissions);
};