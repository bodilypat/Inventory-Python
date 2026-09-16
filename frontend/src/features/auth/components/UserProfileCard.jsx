/* ***************************************************** */
/* File: src/features/auth/components/UserProfileCard.jsx */
/* ***************************************************** */

import { Link } from 'react-router-dom';

const DEFAULT_USER = {
	name: '',
	email: '',
	role: '',
	avatar: '',
	emailVerified: false,
};

const getInitials = (name = '') => {
	const parts = name
		.trim()
		.split(/\s+/)
		.filter(Boolean);

	if (parts.length === 0) {
		return '?';
	}

	if (parts.length === 1) {
		return parts[0].charAt(0).toUpperCase();
	}

	return `${parts[0].charAt(0)}${parts[
		parts.length - 1
	].charAt(0)}`.toUpperCase();
};

const formatRole = (role = '') => {
	if (!role) {
		return 'User';
	}

	return role
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (character) =>
			character.toUpperCase()
		);
};

const UserProfileCard = ({
	user = DEFAULT_USER,
	onLogout,
	loading = false,
	showActions = true,
}) => {
	const {
		name = '',
		email = '',
		role = '',
		avatar = '',
		emailVerified = false,
	} = user || {};

	const displayName = name.trim() || 'User';
	const initials = getInitials(name || email);
	const formattedRole = formatRole(role);

	const handleLogout = async () => {
		if (loading || !onLogout) {
			return;
		}

		await onLogout();
	};

	return (
		<article
			className="user-profile-card"
			aria-labelledby="user-profile-name"
		>
			<div className="user-profile-header">
				<div
					className="user-avatar"
					aria-hidden={Boolean(avatar)}
				>
					{avatar ? (
						<img
							src={avatar}
							alt=""
							className="user-avatar-image"
						/>
					) : (
						<span className="user-avatar-initials">
							{initials}
						</span>
					)}
				</div>

				<div className="user-profile-heading">
					<h2 id="user-profile-name">
						{displayName}
					</h2>

					<p className="user-profile-role">
						{formattedRole}
					</p>
				</div>
			</div>

			<div className="user-profile-details">
				<div className="profile-detail">
					<span className="profile-detail-label">
						Email
					</span>

					<span className="profile-detail-value">
						{email || 'No email available'}
					</span>
				</div>

				<div className="profile-detail">
					<span className="profile-detail-label">
						Email status
					</span>

					<span
						className={`profile-status ${
							emailVerified
								? 'profile-status-verified'
								: 'profile-status-unverified'
						}`}
					>
						{emailVerified
							? 'Verified'
							: 'Not verified'}
					</span>
				</div>
			</div>

			{!emailVerified && email && (
				<div className="profile-verification-notice">
					<p>
						Please verify your email address to keep
						your account secure.
					</p>

					<Link
						to="/verify-email"
						className="auth-link"
					>
						Verify email
					</Link>
				</div>
			)}

			{showActions && (
				<footer className="user-profile-actions">
					<Link
						to="/profile"
						className="auth-secondary-button"
					>
						Edit profile
					</Link>

					<Link
						to="/change-password"
						className="auth-secondary-button"
					>
						Change password
					</Link>

					<button
						type="button"
						className="auth-danger-button"
						onClick={handleLogout}
						disabled={loading || !onLogout}
					>
						{loading
							? 'Signing out...'
							: 'Sign out'}
					</button>
				</footer>
			)}
		</article>
	);
};

export default UserProfileCard;
