/* ********************************************************* */
/* File: src/features/auth/components/ForgotPasswordForm.jsx */
/* ********************************************************* */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForgotPassword } from '../hooks/useForgotPassword';

const INITIAL_FORM = {
	email: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordForm = () => {
	const [form, setForm] = useState(INITIAL_FORM);
	const [validationError, setValidationError] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const {
		forgotPassword,
		error: apiError,
		isLoading,
	} = useForgotPassword();

	const handleChange = ({ target }) => {
		setForm({
			email: target.value,
		});

		setValidationError('');
		setIsSuccess(false);
	};

	const validateEmail = () => {
		const email = form.email.trim();

		if (!email) {
			return 'Email address is required.';
		}

		if (!EMAIL_PATTERN.test(email)) {
			return 'Please enter a valid email address.';
		}

		return '';
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const error = validateEmail();

		if (error) {
			setValidationError(error);
			return;
		}

		setValidationError('');
		setIsSuccess(false);

		try {
			await forgotPassword(form.email.trim().toLowerCase());

			/*
			 * Keep this message generic. Do not reveal whether
			 * the submitted email belongs to an account.
			 */
			setIsSuccess(true);
			setForm(INITIAL_FORM);
		} catch {
			// API errors are exposed by useForgotPassword().
		}
	};

	const error = validationError || apiError;

	return (
		<form
			onSubmit={handleSubmit}
			className="forgot-password-form"
			noValidate
			aria-labelledby="forgot-password-title"
		>
			<header className="form-header">
				<h2 id="forgot-password-title">
					Forgot password?
				</h2>

				<p>
					Enter your email address and we'll send you a
					link to reset your password.
				</p>
			</header>

			{isSuccess ? (
				<div
					className="forgot-password-success"
					role="status"
					aria-live="polite"
				>
					<h3>Check your inbox</h3>

					<p>
						If an account exists for that email address,
						you'll receive a password reset link shortly.
					</p>

					<p>
						If you don't see the email, check your spam or
						junk folder.
					</p>

					<div className="form-actions">
						<button
							type="button"
							className="auth-secondary-button"
							onClick={() => setIsSuccess(false)}
						>
							Try another email
						</button>

						<Link
							to="/login"
							className="auth-link"
						>
							Back to sign in
						</Link>
					</div>
				</div>
			) : (
				<>
					{error && (
						<div
							id="forgot-password-form-error"
							className="form-error"
							role="alert"
							aria-live="polite"
						>
							{error}
						</div>
					)}

					<div className="form-group">
						<label htmlFor="forgot-password-email">
							Email address
						</label>

						<input
							id="forgot-password-email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							autoComplete="email"
							inputMode="email"
							placeholder="you@example.com"
							aria-invalid={Boolean(error)}
							aria-describedby={
								error
									? 'forgot-password-email-error'
									: undefined
							}
							disabled={isLoading}
							autoFocus
						/>

						{error && (
							<p
								id="forgot-password-email-error"
								className="field-error"
							>
								{error}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="auth-submit-button"
						disabled={isLoading}
					>
						{isLoading
							? 'Sending reset link...'
							: 'Send reset link'}
					</button>

					<footer className="form-footer">
						<p>
							Remember your password?{' '}
							<Link to="/login">
								Sign in
							</Link>
						</p>
					</footer>
				</>
			)}
		</form>
	);
};

export default ForgotPasswordForm;
