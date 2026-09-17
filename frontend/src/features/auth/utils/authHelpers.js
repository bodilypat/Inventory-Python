/* ******************************************** */
/* File: src/features/auth/utils/authHelpers.js */
/* ******************************************** */

import {
  USER_KEY,
  AUTH_EVENTS,
} from '../constants/authConstants';

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (!user) {
    localStorage.removeItem(USER_KEY);
  } else {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_EVENTS.USER_UPDATED, {
      detail: user,
    })
  );
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_KEY);

  window.dispatchEvent(
    new CustomEvent(AUTH_EVENTS.LOGOUT)
  );
};

export const emitLoginEvent = (user) => {
  window.dispatchEvent(
    new CustomEvent(AUTH_EVENTS.LOGIN, {
      detail: user,
    })
  );
};

export const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    id: user.id ?? user._id,
    role: user.role?.toLowerCase?.() || 'customer',
    permissions: Array.isArray(user.permissions)
      ? user.permissions
      : [],
  };
};

export const getUserDisplayName = (user) => {
  if (!user) return '';

  if (user.name) return user.name;

  return [user.firstName, user.lastName]
    .filter(Boolean)
    .join(' ');
};

export const isEmailVerified = (user) =>
  Boolean(
    user?.emailVerified ??
      user?.isEmailVerified ??
      false
  );
  