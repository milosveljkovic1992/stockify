import { styled } from '@mui/system';
import { SidebarMenu } from './SidebarMenu/SidebarMenu';

const Container = styled('div')({
	width: '100%',
	height: '100%',
	minHeight: '93vh',

	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',

	paddingLeft: '50px',
	backgroundColor: 'purple',
});

export const Dashboard = () => {
	return (
		<div>
			<SidebarMenu />
			<Container>
				<h1>Aside</h1>
				<h1>Body</h1>
			</Container>
		</div>
	);
};
