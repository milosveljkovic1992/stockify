import { forwardRef, MouseEvent, useState } from 'react';

import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputWithIconProps {
	id: string;
}

export const PasswordInputWithIcon = forwardRef<
	HTMLInputElement,
	PasswordInputWithIconProps
>(({ id }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show);
	};

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<FormControl sx={{ m: 1, width: '40ch' }} color="secondary">
			<InputLabel htmlFor={id}>Password</InputLabel>

			<OutlinedInput
				id={id}
				type={showPassword ? 'text' : 'password'}
				startAdornment={
					<InputAdornment position="start">
						<Lock />
					</InputAdornment>
				}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
				autoComplete="off"
				inputRef={ref}
			/>
		</FormControl>
	);
});

PasswordInputWithIcon.displayName = 'PasswordInputWithIcon';
