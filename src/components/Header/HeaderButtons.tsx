import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, useTheme } from '@mui/material';
import { DefaultButton } from 'components/shared';

export const HeaderButtons = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

	const handleLoginButton = () => {
		if (location.pathname !== '/login') {
			navigate('/login');
		}
	};

	const handleRegisterButton = () => {
		if (location.pathname !== '/register') {
			navigate('/register');
		}
	};

	const buttonStyles = {
		fontSize: '0.875rem',
		padding: '0.5em 1em',
		backgroundColor: theme.palette.primary.dark,

		'&:hover': {
			backgroundColor: theme.palette.primary.light,
		},
	};

	return (
		<Grid container gap="15px">
			<Grid item>
				<DefaultButton onClick={handleLoginButton} sx={buttonStyles}>
					Login
				</DefaultButton>
			</Grid>

			<Grid item>
				<DefaultButton onClick={handleRegisterButton} sx={buttonStyles}>
					Register
				</DefaultButton>
			</Grid>
		</Grid>
	);
};
