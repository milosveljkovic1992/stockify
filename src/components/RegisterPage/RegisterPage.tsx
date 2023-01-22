import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { RegisterForm } from './RegisterForm';

const Container = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',

	width: '900%',
	maxWidth: '960px',
	height: '100%',
	minHeight: '60vh',

	margin: '5vh auto',
	backgroundColor: 'white',
	border: '1px solid #ccc',
	borderRadius: '10px',
});

export const RegisterPage = () => {
	return (
		<Container>
			<Typography variant="h2" component="h1" textAlign="center" my={2}>
				Register
			</Typography>
			<RegisterForm />
		</Container>
	);
};
