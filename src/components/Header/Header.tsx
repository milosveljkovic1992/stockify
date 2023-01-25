import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';

import { HeaderLogo } from './HeaderLogo';
import { MenuForLoggedInUsers } from './HeaderMenu/MenuForLoggedInUsers';
import { MenuForLoggedOutUsers } from './HeaderMenu/MenuForLoggedOutUsers';
import { Wrapper } from 'components/shared';

import type { RootState } from 'store';

const Container = styled('header')(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

const HeaderWrapper = styled(Wrapper)({
	justifyContent: 'space-between',
	alignItems: 'center',

	minHeight: '7vh',
});

export const Header = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	return (
		<Container>
			<HeaderWrapper container>
				<Grid item xs="auto">
					<HeaderLogo />
				</Grid>

				<Grid item xs="auto">
					{isLoggedIn ? <MenuForLoggedInUsers /> : <MenuForLoggedOutUsers />}
				</Grid>
			</HeaderWrapper>
		</Container>
	);
};
