import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from './SidebarMenu/SidebarMenu';

const Container = styled('main')({
	position: 'relative',
	width: '100%',
});

const Content = styled('section')({
	width: '100%',
	height: '100%',
	minHeight: '93vh',

	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'auto 1fr',

	paddingLeft: '70px',
	paddingTop: '5px',
	backgroundColor: 'whitesmoke',
});

export const Dashboard = () => {
	return (
		<Container>
			<SidebarMenu />
			<Content>
				<Outlet />
			</Content>
		</Container>
	);
};
