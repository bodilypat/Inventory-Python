/* **************************************************** */
/* File: src/features/auth/components/VerifyEmailForm.jsx */
/* **************************************************** */

import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_FORM = {
	email: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VerifyEmailForm = ({
	onSubmit,
	loading = false,
	error = '',
	initialEmail = '',
}) => {
	const [values, setValues] = useState({
		email: initialEmail,
	});

	const [validationError, setValidationError] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const handleChange = ({ target }) => {
		setValues({
			email: target.value,
		});

		setValidationError('');
		setIsSuccess(false);
	};

	const validateEmail = () => {
		const email = values.email.trim();

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

		if (loading) {
			return;
		}

		const emailError = validateEmail();

		if (emailError) {
			setValidationError(emailError);
			return;
		}

		setValidationError('');
		setIsSuccess(false);

		try {
			await onSubmit?.(values.email.trim().toLowerCase());
			setIsSuccess(true);
		} catch {
			// API errors are supplied through the error prop.
		}
	};

	const handleResend = async () => {
		if (loading) {
			return;
		}

		const emailError = validateEmail();

		if (emailError) {
			setValidationError(emailError);
			setIsSuccess(false);
			return;
		}

		setValidationError('');
		setIsSuccess(false);

		try {
			await onSubmit?.(values.email.trim().toLowerCase());
			setIsSuccess(true);
		} catch {
			// API errors are supplied through the error prop.
		}
	};

	const formError = validationError || error;

	if (isSuccess) {
		return (
			<section
				className="verify-email-success"
				aria-labelledby="verify-email-success-title"
			>
				<div
					role="status"
					aria-live="polite"
				>
					<h2 id="verify-email-success-title">
						Check your inbox
					</h2>

					<p>
						We've sent a verification link to{' '}
						<strong>{values.email.trim()}</strong>.
					</p>

					<p>
						Open the email and follow the link to verify
						your account.
					</p>

					<p className="field-hint">
						If you don't see it, check your spam or junk
						folder.
					</p>
				</div>

				<div className="form-actions">
					<button
						type="button"
						className="auth-secondary-button"
						onClick={handleResend}
						disabled={loading}
					>
						{loading
							? 'Sending...'
							: 'Resend verification link'}
					</button>

					<button
						type="button"
						className="auth-secondary-button"
						onClick={() => {
							setIsSuccess(false);
							setValidationError('');
						}}
						disabled={loading}
					>
						Use another email
					</button>

					<Link
						to="/login"
						className="auth-link"
					>
						Back to sign in
					</Link>
				</div>

				{error && (
					<p
						className="form-error"
						role="alert"
						aria-live="polite"
					>
						{error}
					</p>
				)}
			</section>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="verify-email-form"
			noValidate
			aria-labelledby="verify-email-title"
		>
			<header className="form-header">
				<h2 id="verify-email-title">
					Verify your email
				</h2>

				<p>
					Enter your email address and we'll send you a
					verification link.
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
				<label htmlFor="verify-email">
					Email address
				</label>

				<input
					id="verify-email"
					name="email"
					type="email"
					value={values.email}
					onChange={handleChange}
					autoComplete="email"
					inputMode="email"
					placeholder="you@example.com"
					aria-invalid={Boolean(formError)}
					aria-describedby={
						formError
							? 'verify-email-error'
							: undefined
					}
					disabled={loading}
					autoFocus
				/>

				{formError && (
					<p
						id="verify-email-error"
						className="field-error"
					>
						{formError}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="auth-submit-button"
				disabled={loading}
			>
				{loading
					? 'Sending verification link...'
					: 'Send verification link'}
			</button>

			<footer className="form-footer">
				<p>
					Already verified your email?{' '}
					<Link to="/login">
						Sign in
					</Link>
				</p>
			</footer>
		</form>
	);
};

export default VerifyEmailForm;
