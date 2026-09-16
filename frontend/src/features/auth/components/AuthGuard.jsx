/* *********************************************** */
/* File: src/features/auth/components/AuthGuard.jsx */
/* *********************************************** */

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const AuthGuard = ({
	redirectTo = '/login',
	children,
}) => {
	const location = useLocation();

	const {
		isAuthenticated,
		isLoading,
	} = useAuth();

	/*
	 * Wait until the authentication state has been restored
	 * from the server/session/storage.
	 */
	if (isLoading) {
		return (
			<main
				className="auth-guard-loading"
				aria-busy="true"
				aria-live="polite"
			>
				<div className="auth-loading-spinner" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>

				<p>Checking your session...</p>
			</main>
		);
	}

	/*
	 * Unauthenticated users are redirected to the login page.
	 *
	 * The current location is preserved so the application can
	 * optionally return the user to the protected page after login.
	 */
	if (!isAuthenticated) {
		return (
			<Navigate
				to={redirectTo}
				replace
				state={{
					from: location,
				}}
			/>
		);
	}

	/*
	 * Supports both:
	 *
	 * <AuthGuard>
	 *     <Dashboard />
	 * </AuthGuard>
	 *
	 * and React Router's nested-route pattern:
	 *
	 * <Route element={<AuthGuard />}>
	 *     <Route ... />
	 * </Route>
	 */
	return children || <Outlet />;
};

export default AuthGuard;
