import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import { HeaderLogo } from './HeaderLogo';
import { HeaderButtons } from './HeaderButtons';

const Wrapper = styled('header')(({ theme }) => ({
	width: '100%',
	backgroundColor: theme.palette.primary.main,
}));

const Container = styled(Grid)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '100%',
	minHeight: '50px',
	padding: '0 30px',
});

export const Header = () => {
	return (
		<Wrapper>
			<Container container>
				<Grid item xs="auto">
					<HeaderLogo />
				</Grid>

				<Grid item xs="auto">
					<HeaderButtons />
				</Grid>
			</Container>
		</Wrapper>
	);
};
