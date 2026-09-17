/* ****************************************** */
/* File: src/features/auth/constants/roles.js */
/* ****************************************** */
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    MANAGER: 'manager',
    RECEPTIONIST: 'receptionist',
    CUSTOMER: 'customer', 
});

export const ROLE_LABELS = Object.freeze({
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.MANAGER]: 'Manager',
    [ROLES.RECEPTIONIST]: 'Receptionist',
    [ROLES.STAFF]: 'Staff',
    [ROLES.CUSTOMER]: 'Customer', 
});

