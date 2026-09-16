/* ************************************************ */
/* File: src/features/auth/pages/ForgotPassword.jsx */
/* ************************************************ */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useForgotPassword } from '../hooks/useForgotPassword';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [validationError, setValidationError] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const {
		forgotPassword,
		error: apiError,
		isLoading,
	} = useForgotPassword();

	const error = validationError || apiError;

	const validateEmail = (value) => {
		const normalizedEmail = value.trim();

		if (!normalizedEmail) {
			return 'Email address is required.';
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
			return 'Please enter a valid email address.';
		}

		return '';
	};

	const handleChange = (event) => {
		const { value } = event.target;

		setEmail(value);
		setIsSubmitted(false);

		if (validationError) {
			setValidationError('');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const normalizedEmail = email.trim();
		const emailError = validateEmail(normalizedEmail);

		if (emailError) {
			setValidationError(emailError);
			return;
		}

		setValidationError('');
		setIsSubmitted(false);

		try {
			await forgotPassword(normalizedEmail);
			setIsSubmitted(true);
		} catch {
			// The hook is responsible for exposing the API error.
		}
	};

	return (
		<AuthLayout>
			<section
				className="forgot-password-card"
				aria-labelledby="forgot-password-title"
			>
				<header className="auth-header">
					<h1 id="forgot-password-title">Forgot password?</h1>

					<p>
						Enter your email address and we'll send you a
						link to reset your password.
					</p>
				</header>

				{isSubmitted ? (
					<div
						className="auth-success"
						role="status"
						aria-live="polite"
					>
						<h2>Check your email</h2>

						<p>
							If an account exists for{' '}
							<strong>{email.trim()}</strong>, you will
							receive password reset instructions shortly.
						</p>

						<Link to="/login" className="auth-link">
							Back to sign in
						</Link>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="forgot-password-form"
						noValidate
					>
						<div className="form-group">
							<label htmlFor="email">
								Email address
							</label>

							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								inputMode="email"
								value={email}
								onChange={handleChange}
								placeholder="you@example.com"
								aria-invalid={Boolean(error)}
								aria-describedby={
									error ? 'email-error' : undefined
								}
								disabled={isLoading}
								autoFocus
							/>

							{error && (
								<p
									id="email-error"
									className="field-error"
									role="alert"
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

						<div className="auth-footer">
							<Link to="/login" className="auth-link">
								Back to sign in
							</Link>
						</div>
					</form>
				)}
			</section>
		</AuthLayout>
	);
};

export default ForgotPassword;
