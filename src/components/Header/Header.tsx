import { Grid } from '@mui/material';
import { styled } from '@mui/system';

import { HeaderLogo } from './HeaderLogo';
import { HeaderButtons } from './HeaderButtons';
import { Wrapper } from 'components/shared';

const Container = styled('header')(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

const HeaderWrapper = styled(Wrapper)({
	justifyContent: 'space-between',
	alignItems: 'center',

	minHeight: '60px',
});

export const Header = () => {
	return (
		<Container>
			<HeaderWrapper container>
				<Grid item xs="auto">
					<HeaderLogo />
				</Grid>

				<Grid item xs="auto">
					<HeaderButtons />
				</Grid>
			</HeaderWrapper>
		</Container>
	);
};
