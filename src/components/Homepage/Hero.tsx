import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Separator, SignupButton, Wrapper } from 'components/shared';

const Container = styled(Wrapper)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		minHeight: '80vh',
	},
}));

export const Hero = () => {
	return (
		<section>
			<Container container flexDirection="column">
				<Separator desktop="15vh" mobile="10vh" />

				<Typography variant="h4" component="h1" mb={2}>
					Need to handle your stock?
				</Typography>
				<Typography variant="h1" component="h2" mb={2}>
					We got you
				</Typography>
				<Typography variant="cta" mb={5}>
					Check out our demo and see how it&apos;s done
				</Typography>

				<Grid item>
					<SignupButton />
				</Grid>

				<Separator desktop="20vh" mobile="10vh" />
			</Container>
		</section>
	);
};
