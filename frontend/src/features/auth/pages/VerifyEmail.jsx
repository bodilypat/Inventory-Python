/* ********************************************* */
/* File: src/features/auth/pages/VerifyEmail.jsx */
/* ********************************************* */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useVerifyEmail } from '../hooks/useVerifyEmail';

const VerifyEmail = () => {
	const [email, setEmail] = useState('');
	const [validationError, setValidationError] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const {
		verifyEmail,
		error: apiError,
		isLoading,
	} = useVerifyEmail();

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

	const handleChange = ({ target }) => {
		setEmail(target.value);
		setValidationError('');
		setIsSubmitted(false);
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
			await verifyEmail(normalizedEmail);
			setIsSubmitted(true);
		} catch {
			// The hook exposes the API error.
		}
	};

	const handleResend = async () => {
		if (!email.trim() || isLoading) {
			return;
		}

		setIsSubmitted(false);

		try {
			await verifyEmail(email.trim());
			setIsSubmitted(true);
		} catch {
			// The hook exposes the API error.
		}
	};

	return (
		<AuthLayout>
			<section
				className="verify-email-card"
				aria-labelledby="verify-email-title"
			>
				<header className="auth-header">
					<h1 id="verify-email-title">
						Verify your email
					</h1>

					<p>
						Enter your email address and we'll send you a
						verification link.
					</p>
				</header>

				{isSubmitted ? (
					<div
						className="auth-success"
						role="status"
						aria-live="polite"
					>
						<h2>Check your inbox</h2>

						<p>
							We've sent a verification link to{' '}
							<strong>{email.trim()}</strong>.
						</p>

						<p>
							Didn't receive the email? Check your spam
							folder or resend the verification link.
						</p>

						<div className="auth-actions">
							<button
								type="button"
								className="auth-submit-button"
								onClick={handleResend}
								disabled={isLoading}
							>
								{isLoading
									? 'Sending...'
									: 'Resend verification link'}
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
					<form
						onSubmit={handleSubmit}
						className="verify-email-form"
						noValidate
					>
						{error && (
							<div
								className="form-error"
								role="alert"
								aria-live="polite"
							>
								{error}
							</div>
						)}

						<div className="form-group">
							<label htmlFor="verify-email">
								Email address
							</label>

							<input
								id="verify-email"
								name="email"
								type="email"
								value={email}
								onChange={handleChange}
								autoComplete="email"
								inputMode="email"
								placeholder="you@example.com"
								aria-invalid={Boolean(error)}
								aria-describedby={
									error
										? 'verify-email-error'
										: undefined
								}
								disabled={isLoading}
								autoFocus
							/>

							{error && (
								<p
									id="verify-email-error"
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
								? 'Sending verification link...'
								: 'Send verification link'}
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

export default VerifyEmail;
