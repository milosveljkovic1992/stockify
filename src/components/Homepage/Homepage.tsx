import { styled } from '@mui/system';

import { Hero } from './Hero';

const Container = styled('div')({
	minHeight: 'calc(100vh - 60px)',
});

export const Homepage = () => {
	return (
		<Container>
			<Hero />
		</Container>
	);
};
