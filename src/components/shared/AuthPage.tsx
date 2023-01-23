import { ReactNode } from 'react';

import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	width: '90%',
	maxWidth: '960px',
	height: '100%',
	minHeight: '60vh',

	margin: '5vh auto',
	backgroundColor: 'white',
	border: '1px solid #ccc',
	borderRadius: '10px',
});

interface RegisterPageProps {
	title: string;
	children: ReactNode;
}

export const AuthPage = ({ title, children }: RegisterPageProps) => {
	return (
		<Container>
			<Typography variant="h2" component="h1" textAlign="center" my={2}>
				{title}
			</Typography>
			{children}
		</Container>
	);
};
