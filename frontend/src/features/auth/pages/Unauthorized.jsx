/* ********************************************** */
/* File: src/features/auth/pages/Unauthorized.jsx */
/* ********************************************** */

import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';

const Unauthorized = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
			return;
		}

		navigate('/dashboard', { replace: true });
	};

	return (
		<AuthLayout>
			<main
				className="unauthorized-page"
				aria-labelledby="unauthorized-title"
			>
				<section
					className="unauthorized-card"
					aria-describedby="unauthorized-description"
				>
					<div className="unauthorized-icon" aria-hidden="true">
						!
					</div>

					<p className="unauthorized-code" aria-hidden="true">
						403
					</p>

					<h1 id="unauthorized-title">
						Access denied
					</h1>

					<p id="unauthorized-description">
						You are signed in, but you do not have permission
						to access this page.
					</p>

					<div className="unauthorized-actions">
						<Link
							to="/dashboard"
							className="auth-submit-button"
						>
							Go to dashboard
						</Link>

						<button
							type="button"
							className="auth-secondary-button"
							onClick={handleGoBack}
						>
							Go back
						</button>
					</div>

					<p className="unauthorized-help">
						If you believe you should have access, contact
						your hotel administrator.
					</p>
				</section>
			</main>
		</AuthLayout>
	);
};

export default Unauthorized;
