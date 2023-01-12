import { styled } from '@mui/system';

interface SeparatorProps {
	desktop?: string;
	mobile?: string;
	size?: string;
}

export const Separator = styled('div')<SeparatorProps>(
	({ theme, desktop, mobile, size }) => ({
		height: mobile || size || undefined,

		[theme.breakpoints.up('md')]: {
			height: desktop || size || undefined,
		},
	}),
);
