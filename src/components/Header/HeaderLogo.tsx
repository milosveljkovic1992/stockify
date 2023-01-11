import { Link } from 'react-router-dom';
import { useMediaQuery, Grid, Typography } from '@mui/material';

export const HeaderLogo = () => {
	const matches = useMediaQuery('(min-width: 600px)');

	return (
		<Link to="/" style={{ textDecoration: 'none' }}>
			<Grid container flexDirection="row">
				<Grid item>
					<img
						src="header-logo.png"
						height="50px"
						width="auto"
						style={{ padding: '5px 0', marginBottom: '-4px' }}
						alt="stockify logo"
					/>
				</Grid>

				{matches && (
					<Grid item flexDirection="column" p="2px 5px 0">
						<Grid>
							<Typography variant="logo">Stockify</Typography>
						</Grid>
						<Grid>
							<Typography variant="slogan">WE GOT IT</Typography>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Link>
	);
};
