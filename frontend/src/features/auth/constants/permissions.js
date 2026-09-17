/* ************************************************ */
/* File: src/features/auth/constants/permissions.js */ 
/* ************************************************ */
export const PERMISSIONS = Object.freeze({
    DASHBOARD_VIEW: 'dashboard:view',

    ROOM_VIEW: 'room:view',
    ROOM_CREATE: 'room:create',
    ROOM_UPDATE: 'room:update',
    ROOM_DELETE: 'room:delete',

    BOOKING_VIEW: 'booking:view',
    BOOKING_CREATE: 'booking:create',
    BOOKING_UPDATE: 'booking:update',
    BOOKING_DELETE: 'booking:delete',

    CUSTOMER_VIEW: 'booking:view',
    CUSTOMER_CREATE: 'customer:create',
    CUSTOMER_UPDATE: 'customer:update',
    CUSTOMER_DELETE: 'customer:delete',

    USER_VIEW: 'user:view',
    USER_CREATE: 'user:create',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete', 
});

export const ALL_PERMISSIONS = Object.values(PERMISSIONS);