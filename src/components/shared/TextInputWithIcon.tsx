import { forwardRef, ReactNode } from 'react';

import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

interface TextInputWithIconProps {
	id: string;
	label: string;
	children: ReactNode;
	type?: 'text' | 'email' | 'password';
}

export const TextInputWithIcon = forwardRef<
	HTMLInputElement,
	TextInputWithIconProps
>(({ id, label, type = 'text', children }, ref) => {
	return (
		<FormControl
			fullWidth
			sx={{ m: 1, maxWidth: '95%', width: '40ch' }}
			color="secondary"
		>
			<InputLabel htmlFor={id}>{label}</InputLabel>

			<OutlinedInput
				id={id}
				type={type}
				startAdornment={children}
				label={label}
				autoComplete="off"
				inputRef={ref}
				required
			/>
		</FormControl>
	);
});

TextInputWithIcon.displayName = 'TextInputWithIcon';
