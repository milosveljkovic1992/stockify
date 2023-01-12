import { ReactNode } from 'react';

import { Button } from '@mui/material';
import { styled } from '@mui/system';

interface ButtonProps {
	children: ReactNode;
	onClick: () => void;
	variant?: 'text' | 'contained' | 'outlined';
	sx?: {
		[key: string]: any;
	};
}

const StyledButton = styled(Button)({
	fontWeight: 600,
	color: 'white',
	padding: '0.75em 1.5em',
	fontSize: '1rem',

	fontFamily:
		'Arial, Poppins, Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
});

export const DefaultButton = ({
	children,
	onClick,
	variant,
	sx,
}: ButtonProps) => {
	return (
		<StyledButton
			onClick={onClick}
			variant={variant || 'contained'}
			disableRipple
			sx={sx}
		>
			{children}
		</StyledButton>
	);
};
