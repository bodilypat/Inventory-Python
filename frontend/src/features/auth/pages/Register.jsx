/* ****************************************** */
/* File: src/features/auth/pages/Register.jsx */
/* ****************************************** */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const INITIAL_FORM = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

function Register() {
	const navigate = useNavigate();

	const [form, setForm] = useState(INITIAL_FORM);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setForm((current) => ({
			...current,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((current) => ({
				...current,
				[name]: '',
			}));
		}

		if (errors.form) {
			setErrors((current) => ({
				...current,
				form: '',
			}));
		}
	};

	const validateForm = () => {
		const validationErrors = {};

		const name = form.name.trim();
		const email = form.email.trim();
		const password = form.password;
		const confirmPassword = form.confirmPassword;

		if (!name) {
			validationErrors.name = 'Full name is required.';
		} else if (name.length < 2) {
			validationErrors.name = 'Name must be at least 2 characters.';
		}

		if (!email) {
			validationErrors.email = 'Email address is required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			validationErrors.email = 'Please enter a valid email address.';
		}

		if (!password) {
			validationErrors.password = 'Password is required.';
		} else if (password.length < 8) {
			validationErrors.password =
				'Password must be at least 8 characters.';
		}

		if (!confirmPassword) {
			validationErrors.confirmPassword =
				'Please confirm your password.';
		} else if (password !== confirmPassword) {
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

		setIsLoading(true);
		setErrors({});

		try {
			/*
			 * Connect the registration API here.
			 *
			 * Example:
			 *
			 * await register({
			 *     name: form.name.trim(),
			 *     email: form.email.trim(),
			 *     password: form.password,
			 * });
			 */

			// Temporary simulation.
			await new Promise((resolve) => setTimeout(resolve, 800));

			navigate('/login');
		} catch (error) {
			setErrors({
				form:
					error?.message ||
					'Unable to create your account. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="register-page">
			<section
				className="register-card"
				aria-labelledby="register-title"
			>
				<header className="register-header">
					<h1 id="register-title">Create an account</h1>
					<p>
						Register to manage your hotel reservations.
					</p>
				</header>

				<form onSubmit={handleSubmit} noValidate>
					{errors.form && (
						<div className="form-error" role="alert">
							{errors.form}
						</div>
					)}

					<div className="form-group">
						<label htmlFor="name">Full name</label>

						<input
							id="name"
							name="name"
							type="text"
							autoComplete="name"
							value={form.name}
							onChange={handleChange}
							placeholder="John Doe"
							aria-invalid={Boolean(errors.name)}
							aria-describedby={
								errors.name ? 'name-error' : undefined
							}
							disabled={isLoading}
						/>

						{errors.name && (
							<p id="name-error" className="field-error">
								{errors.name}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="email">Email address</label>

						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							value={form.email}
							onChange={handleChange}
							placeholder="you@example.com"
							aria-invalid={Boolean(errors.email)}
							aria-describedby={
								errors.email ? 'email-error' : undefined
							}
							disabled={isLoading}
						/>

						{errors.email && (
							<p id="email-error" className="field-error">
								{errors.email}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>

						<div className="password-input">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="new-password"
								value={form.password}
								onChange={handleChange}
								placeholder="Create a password"
								minLength={8}
								aria-invalid={Boolean(errors.password)}
								aria-describedby={
									errors.password
										? 'password-error'
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
							<p id="password-error" className="field-error">
								{errors.password}
							</p>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword">
							Confirm password
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
								autoComplete="new-password"
								value={form.confirmPassword}
								onChange={handleChange}
								placeholder="Confirm your password"
								minLength={8}
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
						className="register-button"
						disabled={isLoading}
					>
						{isLoading ? 'Creating account...' : 'Register'}
					</button>
				</form>

				<footer className="register-footer">
					<p>
						Already have an account?{' '}
						<Link to="/login">Sign in</Link>
					</p>
				</footer>
			</section>
		</main>
	);
}

export default Register;
