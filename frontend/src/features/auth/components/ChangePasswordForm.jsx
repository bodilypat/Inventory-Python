/* ********************************************************* */
/* File: src/features/auth/components/ChangePasswordForm.jsx */
/* ********************************************************* */

import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_FORM = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
};

const ChangePasswordForm = ({
	onSubmit,
	loading = false,
	error = '',
}) => {
	const [values, setValues] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [showCurrentPassword, setShowCurrentPassword] =
		useState(false);
	const [showNewPassword, setShowNewPassword] =
		useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

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

		setIsSuccess(false);
	};

	const validateForm = () => {
		const validationErrors = {};

		if (!values.currentPassword) {
			validationErrors.currentPassword =
				'Current password is required.';
		}

		if (!values.newPassword) {
			validationErrors.newPassword =
				'New password is required.';
		} else if (values.newPassword.length < 8) {
			validationErrors.newPassword =
				'New password must be at least 8 characters.';
		}

		if (!values.confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your new password.';
		} else if (
			values.newPassword !== values.confirmPassword
		) {
			validationErrors.confirmPassword =
				'New passwords do not match.';
		}

		if (
			values.currentPassword &&
			values.newPassword &&
			values.currentPassword === values.newPassword
		) {
			validationErrors.newPassword =
				'Your new password must be different from your current password.';
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
		setIsSuccess(false);

		try {
			await onSubmit?.({
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
			});

			setValues(INITIAL_FORM);
			setIsSuccess(true);
		} catch {
			// API errors are provided by the parent.
		}
	};

	const formError = errors.form || error;

	if (isSuccess) {
		return (
			<div
				className="change-password-success"
				role="status"
				aria-live="polite"
			>
				<h2>Password changed successfully</h2>

				<p>
					Your password has been updated and your account
					is now protected with your new password.
				</p>

				<div className="form-actions">
					<button
						type="button"
						className="auth-secondary-button"
						onClick={() => setIsSuccess(false)}
					>
						Change it again
					</button>

					<Link
						to="/dashboard"
						className="auth-link"
					>
						Back to dashboard
					</Link>
				</div>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="change-password-form"
			noValidate
			aria-labelledby="change-password-form-title"
		>
			<header className="form-header">
				<h2 id="change-password-form-title">
					Change password
				</h2>

				<p>
					Update your password to keep your account secure.
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
				<label htmlFor="change-current-password">
					Current password
				</label>

				<div className="password-input">
					<input
						id="change-current-password"
						name="currentPassword"
						type={
							showCurrentPassword
								? 'text'
								: 'password'
						}
						value={values.currentPassword}
						onChange={handleChange}
						autoComplete="current-password"
						placeholder="Enter your current password"
						aria-invalid={Boolean(
							errors.currentPassword
						)}
						aria-describedby={
							errors.currentPassword
								? 'change-current-password-error'
								: undefined
						}
						disabled={loading}
						autoFocus
					/>

					<button
						type="button"
						className="password-toggle"
						onClick={() =>
							setShowCurrentPassword(
								(current) => !current
							)
						}
						aria-label={
							showCurrentPassword
								? 'Hide current password'
								: 'Show current password'
						}
						disabled={loading}
					>
						{showCurrentPassword
							? 'Hide'
							: 'Show'}
					</button>
				</div>

				{errors.currentPassword && (
					<p
						id="change-current-password-error"
						className="field-error"
					>
						{errors.currentPassword}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="change-new-password">
					New password
				</label>

				<div className="password-input">
					<input
						id="change-new-password"
						name="newPassword"
						type={
							showNewPassword
								? 'text'
								: 'password'
						}
						value={values.newPassword}
						onChange={handleChange}
						autoComplete="new-password"
						minLength={8}
						placeholder="Enter your new password"
						aria-invalid={Boolean(
							errors.newPassword
						)}
						aria-describedby={
							errors.newPassword
								? 'change-new-password-error change-password-hint'
								: 'change-password-hint'
						}
						disabled={loading}
					/>

					<button
						type="button"
						className="password-toggle"
						onClick={() =>
							setShowNewPassword(
								(current) => !current
							)
						}
						aria-label={
							showNewPassword
								? 'Hide new password'
								: 'Show new password'
						}
						disabled={loading}
					>
						{showNewPassword ? 'Hide' : 'Show'}
					</button>
				</div>

				<p
					id="change-password-hint"
					className="field-hint"
				>
					Use at least 8 characters.
				</p>

				{errors.newPassword && (
					<p
						id="change-new-password-error"
						className="field-error"
					>
						{errors.newPassword}
					</p>
				)}
			</div>

			<div className="form-group">
				<label htmlFor="change-confirm-password">
					Confirm new password
				</label>

				<div className="password-input">
					<input
						id="change-confirm-password"
						name="confirmPassword"
						type={
							showConfirmPassword
								? 'text'
								: 'password'
						}
						value={values.confirmPassword}
						onChange={handleChange}
						autoComplete="new-password"
						placeholder="Confirm your new password"
						aria-invalid={Boolean(
							errors.confirmPassword
						)}
						aria-describedby={
							errors.confirmPassword
								? 'change-confirm-password-error'
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
								? 'Hide new password'
								: 'Show new password'
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
						id="change-confirm-password-error"
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
					? 'Changing password...'
					: 'Change password'}
			</button>

			<footer className="form-footer">
				<Link
					to="/dashboard"
					className="auth-link"
				>
					Cancel
				</Link>
			</footer>
		</form>
	);
};

export default ChangePasswordForm;
