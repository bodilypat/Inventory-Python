/* *********************************************** */
/* File: src/features/auth/pages/ResetPassword.jsx */
/* *********************************************** */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useResetPassword } from '../hooks/useResetPassword';

const INITIAL_FORM = {
	password: '',
	confirmPassword: '',
};

const ResetPassword = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token')?.trim() || '';

	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [isSuccess, setIsSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		resetPassword,
		error: apiError,
		isLoading,
	} = useResetPassword();

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

		if (!token) {
			validationErrors.form =
				'This password reset link is invalid or incomplete.';
		}

		if (!form.password) {
			validationErrors.password = 'New password is required.';
		} else if (form.password.length < 8) {
			validationErrors.password =
				'Password must be at least 8 characters.';
		}

		if (!form.confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your new password.';
		} else if (form.password !== form.confirmPassword) {
			validationErrors.confirmPassword =
				'Passwords do not match.';
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
			await resetPassword({
				token,
				password: form.password,
			});

			setForm(INITIAL_FORM);
			setIsSuccess(true);
		} catch {
			// The hook exposes the API error.
		}
	};

	const formError = errors.form || apiError;

	return (
		<AuthLayout>
			<section
				className="reset-password-card"
				aria-labelledby="reset-password-title"
			>
				<header className="auth-header">
					<h1 id="reset-password-title">
						Reset password
					</h1>

					<p>
						Enter a new password for your account.
					</p>
				</header>

				{isSuccess ? (
					<div
						className="auth-success"
						role="status"
						aria-live="polite"
					>
						<h2>Password reset successfully</h2>

						<p>
							Your password has been updated. You can now
							sign in with your new password.
						</p>

						<Link
							to="/login"
							className="auth-submit-button"
						>
							Go to sign in
						</Link>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="reset-password-form"
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
							<label htmlFor="password">
								New password
							</label>

							<div className="password-input">
								<input
									id="password"
									name="password"
									type={
										showPassword
											? 'text'
											: 'password'
									}
									value={form.password}
									onChange={handleChange}
									minLength={8}
									autoComplete="new-password"
									placeholder="Enter your new password"
									aria-invalid={Boolean(
										errors.password
									)}
									aria-describedby={
										errors.password
											? 'password-error'
											: undefined
									}
									disabled={isLoading}
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
									disabled={isLoading}
								>
									{showPassword ? 'Hide' : 'Show'}
								</button>
							</div>

							<p className="field-hint">
								Use at least 8 characters.
							</p>

							{errors.password && (
								<p
									id="password-error"
									className="field-error"
								>
									{errors.password}
								</p>
							)}
						</div>

						<div className="form-group">
							<label htmlFor="confirm-password">
								Confirm password
							</label>

							<div className="password-input">
								<input
									id="confirm-password"
									name="confirmPassword"
									type={
										showConfirmPassword
											? 'text'
											: 'password'
									}
									value={form.confirmPassword}
									onChange={handleChange}
									minLength={8}
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
											? 'Hide password'
											: 'Show password'
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
							disabled={isLoading || !token}
						>
							{isLoading
								? 'Resetting...'
								: 'Reset password'}
						</button>

						<div className="auth-footer">
							<Link
								to="/login"
								className="auth-link"
							>
								Back to sign in
							</Link>
						</div>
					</form>
				)}
			</section>
		</AuthLayout>
	);
};

export default ResetPassword;
