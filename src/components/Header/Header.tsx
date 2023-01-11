import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import { ButtonContainer } from './Buttons/ButtonContainer';
import { LogoContainer } from './Logo/LogoContainer';

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
					<LogoContainer />
				</Grid>

				<Grid item xs="auto">
					<ButtonContainer />
				</Grid>
			</Container>
		</Wrapper>
	);
};
