/* *************************************************** */
/* File: src/features/auth/components/RegisterForm.jsx */
/* *************************************************** */

import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_VALUES = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = ({
	onSubmit,
	loading = false,
	error = '',
}) => {
	const [values, setValues] = useState(INITIAL_VALUES);
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setValues((current) => ({
			...current,
			[name]: value,
		}));

		setErrors((current) => ({
			...current,
			[name]: '',
			form: '',
		}));
	};

	const validateForm = () => {
		const validationErrors = {};

		const name = values.name.trim();
		const email = values.email.trim();

		if (!name) {
			validationErrors.name = 'Full name is required.';
		} else if (name.length < 2) {
			validationErrors.name =
				'Full name must be at least 2 characters.';
		}

		if (!email) {
			validationErrors.email =
				'Email address is required.';
		} else if (!EMAIL_PATTERN.test(email)) {
			validationErrors.email =
				'Please enter a valid email address.';
		}

		if (!values.password) {
			validationErrors.password =
				'Password is required.';
		} else if (values.password.length < 8) {
			validationErrors.password =
				'Password must be at least 8 characters.';
		}

		if (!values.confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your password.';
		} else if (
			values.password !== values.confirmPassword
		) {
			validationErrors.confirmPassword =
				'Passwords do not match.';
		}

		return validationErrors;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (loading) {
			return;
		}

		const validationErrors = validateForm();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		if (!onSubmit) {
			return;
		}

		setErrors({});

		try {
			await onSubmit({
				name: values.name.trim(),
				email: values.email.trim().toLowerCase(),
				password: values.password,
			});
		} catch {
			// Parent/hook remains responsible for API errors.
		}
	};

	const formError = errors.form || error;

	return (
		<form
			onSubmit={handleSubmit}
			className="register-form"
			noValidate
			aria-labelledby="register-form-title"
		>
			<header className="form-header">
				<h2 id="register-form-title">
					Create your account
				</h2>

				<p>
					Register to manage your hotel account.
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
				<label htmlFor="register-name">
					Full name
				</label>

				<input
					id="register-name"
					name="name"
					type="text"
					value={values.name}
					onChange={handleChange}
					autoComplete="name"
					placeholder="John Doe"
					aria-invalid={Boolean(errors.name)}
					aria-describedby={
						errors.name
							? 'register-name-error'
							: undefined
					}
					disabled={loading}
					autoFocus
				/>

				{errors.name && (
					<p
						id="register-name-error"
						className="field-error"
					>
						{errors.name}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="register-email">
					Email address
				</label>

				<input
					id="register-email"
					name="email"
					type="email"
					value={values.email}
					onChange={handleChange}
					autoComplete="email"
					inputMode="email"
					placeholder="you@example.com"
					aria-invalid={Boolean(errors.email)}
					aria-describedby={
						errors.email
							? 'register-email-error'
							: undefined
					}
					disabled={loading}
				/>

				{errors.email && (
					<p
						id="register-email-error"
						className="field-error"
					>
						{errors.email}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="register-password">
					Password
				</label>

				<div className="password-input">
					<input
						id="register-password"
						name="password"
						type={
							showPassword ? 'text' : 'password'
						}
						value={values.password}
						onChange={handleChange}
						autoComplete="new-password"
						placeholder="Create a password"
						minLength={8}
						aria-invalid={Boolean(errors.password)}
						aria-describedby={
							errors.password
								? 'register-password-error register-password-hint'
								: 'register-password-hint'
						}
						disabled={loading}
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
						disabled={loading}
					>
						{showPassword ? 'Hide' : 'Show'}
					</button>
				</div>

				<p
					id="register-password-hint"
					className="field-hint"
				>
					Use at least 8 characters.
				</p>

				{errors.password && (
					<p
						id="register-password-error"
						className="field-error"
					>
						{errors.password}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="register-confirm-password">
					Confirm password
				</label>

				<div className="password-input">
					<input
						id="register-confirm-password"
						name="confirmPassword"
						type={
							showConfirmPassword
								? 'text'
								: 'password'
						}
						value={values.confirmPassword}
						onChange={handleChange}
						autoComplete="new-password"
						placeholder="Confirm your password"
						aria-invalid={Boolean(
							errors.confirmPassword
						)}
						aria-describedby={
							errors.confirmPassword
								? 'register-confirm-password-error'
								: undefined
						}
						disabled={loading}
					/>

					<button
						type="button"
						className="password-toggle"
						onClick={() =>
							setShowConfirmPassword(
								(current) => !current
							)
						}
						aria-label={
							showConfirmPassword
								? 'Hide password'
								: 'Show password'
						}
						disabled={loading}
					>
						{showConfirmPassword
							? 'Hide'
							: 'Show'}
					</button>
				</div>

				{errors.confirmPassword && (
					<p
						id="register-confirm-password-error"
						className="field-error"
					>
						{errors.confirmPassword}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="register-submit-button"
				disabled={loading}
			>
				{loading
					? 'Creating account...'
					: 'Create account'}
			</button>

			<footer className="form-footer">
				<p>
					Already have an account?{' '}
					<Link to="/login">Sign in</Link>
				</p>
			</footer>
		</form>
	);
};

export default RegisterForm;
