import { styled, Typography, useMediaQuery } from '@mui/material';

const Container = styled('div')({
	width: '100%',
});

export const SectionTitle = ({ children }: { children: string }) => {
	const match = useMediaQuery('(min-width: 480px');

	return (
		<Container>
			<Typography variant={match ? 'h3' : 'h4'} component="h1">
				{children}
			</Typography>
		</Container>
	);
};
