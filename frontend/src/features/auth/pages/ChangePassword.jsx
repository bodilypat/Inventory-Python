/* ************************************************ */
/* File: src/features/auth/pages/ChangePassword.jsx */
/* ************************************************ */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useChangePassword } from '../hooks/useChangePassword';

const INITIAL_FORM = {
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
};

const ChangePassword = () => {
	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [isSuccess, setIsSuccess] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		changePassword,
		error: apiError,
		isLoading,
	} = useChangePassword();

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setForm((current) => ({
			...current,
			[name]: value,
		}));

		setIsSuccess(false);

		if (errors[name] || errors.form) {
			setErrors((current) => ({
				...current,
				[name]: '',
				form: '',
			}));
		}
	};

	const validateForm = () => {
		const validationErrors = {};

		if (!form.currentPassword) {
			validationErrors.currentPassword =
				'Current password is required.';
		}

		if (!form.newPassword) {
			validationErrors.newPassword =
				'New password is required.';
		} else if (form.newPassword.length < 8) {
			validationErrors.newPassword =
				'New password must be at least 8 characters.';
		}

		if (!form.confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your new password.';
		} else if (form.newPassword !== form.confirmPassword) {
			validationErrors.confirmPassword =
				'New passwords do not match.';
		}

		if (
			form.currentPassword &&
			form.newPassword &&
			form.currentPassword === form.newPassword
		) {
			validationErrors.newPassword =
				'Your new password must be different from your current password.';
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
		setIsSuccess(false);

		try {
			await changePassword({
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});

			setForm(INITIAL_FORM);
			setIsSuccess(true);
		} catch {
			// The hook exposes the API error.
		}
	};

	const formError = errors.form || apiError;

	if (isSuccess) {
		return (
			<AuthLayout>
				<section
					className="change-password-card"
					aria-labelledby="change-password-success-title"
				>
					<div
						className="auth-success"
						role="status"
						aria-live="polite"
					>
						<h1 id="change-password-success-title">
							Password changed
						</h1>

						<p>
							Your password has been changed successfully.
						</p>

						<Link
							to="/"
							className="auth-submit-button"
						>
							Back to dashboard
						</Link>
					</div>
				</section>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout>
			<section
				className="change-password-card"
				aria-labelledby="change-password-title"
			>
				<header className="auth-header">
					<h1 id="change-password-title">
						Change password
					</h1>

					<p>
						Update your password to keep your account secure.
					</p>
				</header>

				<form
					onSubmit={handleSubmit}
					className="change-password-form"
					noValidate
				>
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
						<label htmlFor="currentPassword">
							Current password
						</label>

						<div className="password-input">
							<input
								id="currentPassword"
								name="currentPassword"
								type={
									showCurrentPassword
										? 'text'
										: 'password'
								}
								value={form.currentPassword}
								onChange={handleChange}
								autoComplete="current-password"
								placeholder="Enter your current password"
								aria-invalid={Boolean(
									errors.currentPassword
								)}
								aria-describedby={
									errors.currentPassword
										? 'current-password-error'
										: undefined
								}
								disabled={isLoading}
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
								disabled={isLoading}
							>
								{showCurrentPassword
									? 'Hide'
									: 'Show'}
							</button>
						</div>

						{errors.currentPassword && (
							<p
								id="current-password-error"
								className="field-error"
							>
								{errors.currentPassword}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="newPassword">
							New password
						</label>

						<div className="password-input">
							<input
								id="newPassword"
								name="newPassword"
								type={
									showNewPassword
										? 'text'
										: 'password'
								}
								value={form.newPassword}
								onChange={handleChange}
								autoComplete="new-password"
								minLength={8}
								placeholder="Enter your new password"
								aria-invalid={Boolean(
									errors.newPassword
								)}
								aria-describedby={
									errors.newPassword
										? 'new-password-error new-password-hint'
										: 'new-password-hint'
								}
								disabled={isLoading}
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
								disabled={isLoading}
							>
								{showNewPassword ? 'Hide' : 'Show'}
							</button>
						</div>

						<p
							id="new-password-hint"
							className="field-hint"
						>
							Use at least 8 characters.
						</p>

						{errors.newPassword && (
							<p
								id="new-password-error"
								className="field-error"
							>
								{errors.newPassword}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword">
							Confirm new password
						</label>

						<div className="password-input">
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={
									showConfirmPassword
										? 'text'
										: 'password'
								}
								value={form.confirmPassword}
								onChange={handleChange}
								autoComplete="new-password"
								placeholder="Confirm your new password"
								aria-invalid={Boolean(
									errors.confirmPassword
								)}
								aria-describedby={
									errors.confirmPassword
										? 'confirm-password-error'
										: undefined
								}
								disabled={isLoading}
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
								disabled={isLoading}
							>
								{showConfirmPassword
									? 'Hide'
									: 'Show'}
							</button>
						</div>

						{errors.confirmPassword && (
							<p
								id="confirm-password-error"
								className="field-error"
							>
								{errors.confirmPassword}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="auth-submit-button"
						disabled={isLoading}
					>
						{isLoading
							? 'Changing password...'
							: 'Change password'}
					</button>

					<div className="auth-footer">
						<Link to="/" className="auth-link">
							Cancel
						</Link>
					</div>
				</form>
			</section>
		</AuthLayout>
	);
};

export default ChangePassword;
