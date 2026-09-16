/* **************************************************** */
/* File: src/features/auth/components/PasswordInput.jsx */
/* **************************************************** */

import { useId, useState } from 'react';

const PasswordInput = ({
	id,
	name,
	label,
	value,
	onChange,
	error = '',
	hint = '',
	placeholder = '',
	autoComplete = 'current-password',
	minLength,
	required = true,
	disabled = false,
	autoFocus = false,
	className = '',
	showToggle = true,
}) => {
	const generatedId = useId();

	const inputId = id || `password-${generatedId}`;
	const errorId = `${inputId}-error`;
	const hintId = `${inputId}-hint`;

	const [isVisible, setIsVisible] = useState(false);

	const describedBy = [
		hint ? hintId : '',
		error ? errorId : '',
	]
		.filter(Boolean)
		.join(' ') || undefined;

	const handleToggleVisibility = () => {
		if (disabled) {
			return;
		}

		setIsVisible((current) => !current);
	};

	return (
		<div className={`form-group password-field ${className}`}>
			<label htmlFor={inputId}>
				{label}
			</label>

			<div className="password-input">
				<input
					id={inputId}
					name={name}
					type={isVisible ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					autoComplete={autoComplete}
					placeholder={placeholder}
					minLength={minLength}
					required={required}
					disabled={disabled}
					autoFocus={autoFocus}
					aria-invalid={Boolean(error)}
					aria-describedby={describedBy}
				/>

				{showToggle && (
					<button
						type="button"
						className="password-toggle"
						onClick={handleToggleVisibility}
						disabled={disabled}
						aria-label={
							isVisible
								? `Hide ${label.toLowerCase()}`
								: `Show ${label.toLowerCase()}`
						}
						aria-pressed={isVisible}
					>
						{isVisible ? 'Hide' : 'Show'}
					</button>
				)}
			</div>

			{hint && !error && (
				<p
					id={hintId}
					className="field-hint"
				>
					{hint}
				</p>
			)}

			{error && (
				<p
					id={errorId}
					className="field-error"
					role="alert"
					aria-live="polite"
				>
					{error}
				</p>
			)}
		</div>
	);
};

export default PasswordInput;
