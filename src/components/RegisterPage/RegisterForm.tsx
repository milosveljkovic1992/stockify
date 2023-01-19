import { useRef, useEffect } from 'react';

import axios from 'axios';
import { Grid, InputAdornment } from '@mui/material';
import { Mail, AccountBox } from '@mui/icons-material';

import { DefaultButton } from 'components/shared';
import { TextInputWithIcon } from './TextInputWithIcon';
import { PasswordInputWithIcon } from './PasswordInputWithIcon';

export const RegisterForm = () => {
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const resetInputs = () => {
		if (!usernameInputRef.current) return;
		if (!emailInputRef.current) return;
		if (!passwordInputRef.current) return;

		usernameInputRef.current.value = '';
		emailInputRef.current.value = '';
		passwordInputRef.current.value = '';
	};

	const handleSubmit = async () => {
		const username = usernameInputRef.current?.value.trim() as string;
		const email = emailInputRef.current?.value.trim() as string;
		const password = passwordInputRef.current?.value.trim() as string;

		if (!username || !email || !password) {
			resetInputs();
			throw new Error('Please fill out all fields');
		}

		try {
			const { data } = await axios.post('http://localhost:5000/auth/signup', {
				username,
				email,
				password,
			});
			// save user details to global state
			document.cookie = `_uid=${data._id}; path=/; max-age=${60 * 60 * 24}`;
			resetInputs();
			window.location.href = '/dashboard';
		} catch (error) {
			//handle error
			console.log(error);
		}
	};

	useEffect(() => {
		usernameInputRef.current?.focus();
	}, []);

	return (
		<Grid alignItems="center">
			<form onSubmit={handleSubmit}>
				<div>
					<TextInputWithIcon
						id="register-form-username"
						label="Username"
						ref={usernameInputRef}
					>
						<InputAdornment position="start">
							<AccountBox />
						</InputAdornment>
					</TextInputWithIcon>
				</div>

				<div>
					<TextInputWithIcon
						id="register-form-email"
						type="email"
						ref={emailInputRef}
						label="Email"
					>
						<InputAdornment position="start">
							<Mail />
						</InputAdornment>
					</TextInputWithIcon>
				</div>

				<div>
					<PasswordInputWithIcon
						id="register-form-password"
						ref={passwordInputRef}
					/>
				</div>

				<DefaultButton onClick={handleSubmit} sx={{ m: 1, p: '0.5em 1em' }}>
					Sign up
				</DefaultButton>
			</form>
		</Grid>
	);
};
