/* *********************************************** */
/* File: src/features/auth/hooks/usePermissions.js */ 
/* *********************************************** */
import { useMemo } from 'react';

import useAuth from './useAuth';

import {
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccess, 
} from '../utils/permissionHelpers';

export const usePermissions = () => {
    const { user } = useAuth();

    return useMemo(
        () => ({
            user,

            hasRole: (roles) => 
                hasRole(user, roles),

            hasPermission: (permission) =>
                hasPermission(user, permission),

            hasAnyPermission: (permissions) => 
                hasAnyPermission(user, permissions),

            hasAllPermissions: (permissions) => 
                hasAllPermissions(user, permissions),

            canAccess: (options = {}) => 
                canAccess({
                    user,
                    ...options,
                }), 
        }), 
        [user]
    );
};

export default usePermissions;


