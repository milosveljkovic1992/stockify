import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const LogoContainer = styled(Grid)({
	cursor: 'pointer',
	userSelect: 'none',
});

export const HeaderLogo = () => {
	const matches = useMediaQuery('(min-width: 600px)');
	const navigate = useNavigate();
	const location = useLocation();
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	const handleClick = () => {
		if (!isLoggedIn && location.pathname !== '/') {
			navigate('/');
		}
		if (isLoggedIn && location.pathname !== '/dashboard') {
			navigate('/dashboard');
		}
	};

	return (
		<LogoContainer container flexDirection="row" onClick={handleClick}>
			<Grid item height="50px">
				<img
					src="header-logo.png"
					height="50px"
					width="auto"
					alt="stockify logo"
				/>
			</Grid>

			{matches && (
				<Grid item flexDirection="column" pl="5px" height="50px">
					<Grid>
						<Typography variant="logo">Stockify</Typography>
					</Grid>
					<Grid mt="-4px">
						<Typography variant="slogan">WE GOT IT</Typography>
					</Grid>
				</Grid>
			)}
		</LogoContainer>
	);
};
