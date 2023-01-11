import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const HeaderButton = styled(Button)(({ theme }) => ({
	fontWeight: '600',
	backgroundColor: theme.palette.primary.dark,

	'&:hover': {
		backgroundColor: theme.palette.primary.light,
	},
}));

export const ButtonContainer = () => {
	const navigate = useNavigate();
	const location = useLocation();

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

	return (
		<Grid container gap="15px">
			<Grid item>
				<HeaderButton
					variant="contained"
					onClick={handleLoginButton}
					disableRipple
				>
					Login
				</HeaderButton>
			</Grid>

			<Grid item>
				<HeaderButton
					variant="contained"
					onClick={handleRegisterButton}
					disableRipple
				>
					Register
				</HeaderButton>
			</Grid>
		</Grid>
	);
};
