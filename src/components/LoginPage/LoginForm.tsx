import { useRef, useEffect } from 'react';

import { useNavigate } from 'react-router';
import { Grid, InputAdornment } from '@mui/material';
import { AccountBox } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { loginUser } from 'store/user-slice';
import {
	DefaultButton,
	PasswordInputWithIcon,
	TextInputWithIcon,
} from 'components/shared';

export const LoginForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		const username = usernameInputRef.current?.value.trim() as string;
		const password = passwordInputRef.current?.value.trim() as string;

		if (!username || !password) throw new Error('Please fill out all fields');

		dispatch(loginUser({ username, password }));
		resetInputs();
		navigate('/dashboard');
	};

	const resetInputs = () => {
		if (!usernameInputRef.current) return;
		if (!passwordInputRef.current) return;

		usernameInputRef.current.value = '';
		passwordInputRef.current.value = '';
	};

	useEffect(() => {
		usernameInputRef.current?.focus();
	}, []);

	return (
		<Grid alignItems="center" maxWidth="90%">
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
