/* ************************************************ */
/* File: src/features/auth/components/LoginForm.jsx */
/* ************************************************ */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '../hooks/useLogin';

const INITIAL_FORM = {
	email: '',
	password: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = () => {
	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	const {
		login,
		error: apiError,
		isLoading,
	} = useLogin();

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setForm((current) => ({
			...current,
			[name]: value,
		}));

		// Clear the current field error as the user edits it.
		if (errors[name]) {
			setErrors((current) => ({
				...current,
				[name]: '',
			}));
		}

		// Clear form-level validation errors when editing.
		if (errors.form) {
			setErrors((current) => ({
				...current,
				form: '',
			}));
		}
	};

	const validateForm = () => {
		const validationErrors = {};
		const email = form.email.trim();

		if (!email) {
			validationErrors.email = 'Email address is required.';
		} else if (!EMAIL_PATTERN.test(email)) {
			validationErrors.email =
				'Please enter a valid email address.';
		}

		if (!form.password) {
			validationErrors.password = 'Password is required.';
		}

		return validationErrors;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setErrors({});

		try {
			await login(form.email.trim(), form.password);
		} catch {
			// Authentication errors are exposed by useLogin().
		}
	};

	const formError = errors.form || apiError;

	return (
		<form
			onSubmit={handleSubmit}
			className="login-form"
			noValidate
			aria-labelledby="login-title"
		>
			<header className="form-header">
				<h2 id="login-title">Sign in</h2>

				<p>
					Sign in to access your hotel management account.
				</p>
			</header>

			{formError && (
				<div
					className="form-error"
					role="alert"
					aria-live="polite"
				>
					{formError}
				</div>
			)}

			<div className="form-group">
				<label htmlFor="login-email">
					Email address
				</label>

				<input
					id="login-email"
					name="email"
					type="email"
					value={form.email}
					onChange={handleChange}
					autoComplete="email"
					inputMode="email"
					placeholder="you@example.com"
					aria-invalid={Boolean(errors.email)}
					aria-describedby={
						errors.email ? 'login-email-error' : undefined
					}
					disabled={isLoading}
					autoFocus
				/>

				{errors.email && (
					<p
						id="login-email-error"
						className="field-error"
					>
						{errors.email}
					</p>
				)}
			</div>

			<div className="form-group">
				<div className="form-label-row">
					<label htmlFor="login-password">
						Password
					</label>

					<Link to="/forgot-password">
						Forgot password?
					</Link>
				</div>

				<div className="password-input">
					<input
						id="login-password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						value={form.password}
						onChange={handleChange}
						autoComplete="current-password"
						placeholder="Enter your password"
						aria-invalid={Boolean(errors.password)}
						aria-describedby={
							errors.password
								? 'login-password-error'
								: undefined
						}
						disabled={isLoading}
					/>

					<button
						type="button"
						className="password-toggle"
						onClick={() =>
							setShowPassword(
								(current) => !current
							)
						}
						aria-label={
							showPassword
								? 'Hide password'
								: 'Show password'
						}
						disabled={isLoading}
					>
						{showPassword ? 'Hide' : 'Show'}
					</button>
				</div>

				{errors.password && (
					<p
						id="login-password-error"
						className="field-error"
					>
						{errors.password}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="login-submit-button"
				disabled={isLoading}
			>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</button>

			<footer className="form-footer">
				<p>
					Don't have an account?{' '}
					<Link to="/register">
						Create an account
					</Link>
				</p>
			</footer>
		</form>
	);
};

export default LoginForm;
