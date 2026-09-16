/* ******************************************************** */
/* File: src/features/auth/components/ResetPasswordForm.jsx */
/* ******************************************************** */

import { useState } from 'react';

const INITIAL_FORM = {
	password: '',
	confirmPassword: '',
};

const ResetPasswordForm = ({
	onSubmit,
	loading = false,
	error = '',
}) => {
	const [values, setValues] = useState(INITIAL_FORM);
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

		if (!values.password) {
			validationErrors.password =
				'New password is required.';
		} else if (values.password.length < 8) {
			validationErrors.password =
				'Password must be at least 8 characters.';
		}

		if (!values.confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your new password.';
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

		setErrors({});

		await onSubmit?.({
			password: values.password,
		});
	};

	const formError = errors.form || error;

	return (
		<form
			onSubmit={handleSubmit}
			className="reset-password-form"
			noValidate
			aria-labelledby="reset-password-form-title"
		>
			<header className="form-header">
				<h2 id="reset-password-form-title">
					Create a new password
				</h2>

				<p>
					Choose a new password for your account.
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
				<label htmlFor="reset-password">
					New password
				</label>

				<div className="password-input">
					<input
						id="reset-password"
						name="password"
						type={
							showPassword ? 'text' : 'password'
						}
						autoComplete="new-password"
						value={values.password}
						onChange={handleChange}
						minLength={8}
						placeholder="Enter your new password"
						aria-invalid={Boolean(errors.password)}
						aria-describedby={
							errors.password
								? 'reset-password-error reset-password-hint'
								: 'reset-password-hint'
						}
						disabled={loading}
						autoFocus
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
					id="reset-password-hint"
					className="field-hint"
				>
					Use at least 8 characters.
				</p>

				{errors.password && (
					<p
						id="reset-password-error"
						className="field-error"
					>
						{errors.password}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="reset-confirm-password">
					Confirm new password
				</label>

				<div className="password-input">
					<input
						id="reset-confirm-password"
						name="confirmPassword"
						type={
							showConfirmPassword
								? 'text'
								: 'password'
						}
						autoComplete="new-password"
						value={values.confirmPassword}
						onChange={handleChange}
						placeholder="Confirm your new password"
						aria-invalid={Boolean(
							errors.confirmPassword
						)}
						aria-describedby={
							errors.confirmPassword
								? 'reset-confirm-password-error'
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
						id="reset-confirm-password-error"
						className="field-error"
					>
						{errors.confirmPassword}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="auth-submit-button"
				disabled={loading}
			>
				{loading
					? 'Resetting password...'
					: 'Reset password'}
			</button>
		</form>
	);
};

export default ResetPasswordForm;
