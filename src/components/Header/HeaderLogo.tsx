import { Link } from 'react-router-dom';
import { useMediaQuery, Grid, Typography } from '@mui/material';

export const HeaderLogo = () => {
	const matches = useMediaQuery('(min-width: 600px)');

	return (
		<Link to="/" style={{ textDecoration: 'none' }}>
			<Grid container flexDirection="row">
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
			</Grid>
		</Link>
	);
};
