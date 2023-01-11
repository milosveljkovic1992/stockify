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
	return (
		<Grid container gap="15px">
			<Grid item>
				<HeaderButton
					variant="contained"
					onClick={() => console.log('login')}
					disableRipple
				>
					Login
				</HeaderButton>
			</Grid>

			<Grid item>
				<HeaderButton
					variant="contained"
					onClick={() => console.log('register')}
					disableRipple
				>
					Register
				</HeaderButton>
			</Grid>
		</Grid>
	);
};
