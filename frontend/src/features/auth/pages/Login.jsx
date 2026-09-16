/* *************************************** */
/* File: src/features/auth/pages/Login.jsx */
/* *************************************** */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}));

		// Clear field error while typing.
		if (errors[name]) {
			setErrors((previous) => ({
				...previous,
				[name]: '',
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		const email = formData.email.trim();
		const password = formData.password;

		if (!email) {
			newErrors.email = 'Email address is required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Please enter a valid email address.';
		}

		if (!password) {
			newErrors.password = 'Password is required.';
		}

		return newErrors;
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
			 * Authentication should be handled through the auth feature,
			 * not directly inside the page.
			 *
			 * Example:
			 *
			 * const response = await login(formData);
			 *
			 * if (response.success) {
			 *     navigate('/dashboard');
			 * }
			 */

			// Temporary simulation.
			await new Promise((resolve) => setTimeout(resolve, 800));

			navigate('/dashboard');
		} catch (error) {
			setErrors({
				form:
					error?.message ||
					'Unable to sign in. Please check your credentials.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="login-page">
			<section className="login-card" aria-labelledby="login-title">
				<header className="login-header">
					<h1 id="login-title">Welcome back</h1>
					<p>Sign in to manage your hotel.</p>
				</header>

				<form onSubmit={handleSubmit} noValidate>
					{errors.form && (
						<div className="form-error" role="alert">
							{errors.form}
						</div>
					)}

					<div className="form-group">
						<label htmlFor="email">Email address</label>

						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							value={formData.email}
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
						<div className="form-label-row">
							<label htmlFor="password">Password</label>

							<Link to="/forgot-password">
								Forgot password?
							</Link>
						</div>

						<div className="password-input">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Enter your password"
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
									setShowPassword((previous) => !previous)
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

					<button
						type="submit"
						className="login-button"
						disabled={isLoading}
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<footer className="login-footer">
					<p>
						Don't have an account?{' '}
						<Link to="/register">Create an account</Link>
					</p>
				</footer>
			</section>
		</main>
	);
}

export default Login;
