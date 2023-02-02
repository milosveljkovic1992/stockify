import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from './SidebarMenu/SidebarMenu';

const Container = styled('main')({
	position: 'relative',
	width: '100%',
	display: 'flex',
});

const Content = styled('section')({
	width: '100%',
	height: '100%',

	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'auto 1fr',

	padding: '10px 0',
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
