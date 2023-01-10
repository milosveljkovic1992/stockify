import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from 'react';

const Container = styled(Grid)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	height: '100%',
	minHeight: '50px',
	backgroundColor: theme.palette.primary.main,
}));

const HeaderButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.dark,

	'&:hover': {
		backgroundColor: theme.palette.primary.light,
	},
}));

export const Header = () => {
	return (
		<Container container>
			<Grid item xs="auto">
				Logo
			</Grid>
			<Grid container item xs="auto" gap="10px" mx="30px">
				<Grid item>
					<HeaderButton variant="contained">Login</HeaderButton>
				</Grid>
				<Grid item>
					<HeaderButton variant="contained">Register</HeaderButton>
				</Grid>
			</Grid>
		</Container>
	);
};
