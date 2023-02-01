import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ToggleProps {
	open: boolean;
}

export const Container = styled('aside', {
	shouldForwardProp: (prop) => prop !== 'open',
})<ToggleProps>(({ open }) => ({
	position: 'sticky',
	top: '0',
	height: '100vh',
	width: '250px',
	transform: open ? 'translateX(0)' : 'translateX(calc(-100% + 45px))',
	marginRight: open ? '0' : '-200px',
	'z-index': 3,

	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	gap: '10px',

	paddingTop: '5px',
	backgroundColor: 'whitesmoke',
	borderRight: '1px solid rgba(0, 0, 0, 0.1)',
	boxShadow: '3px 0 7px rgba(0, 0, 0, .1)',
	transition: '0.2s ease-in-out',
}));

export const Divider = styled('span')({
	position: 'relative',
	height: '1px',
	width: '100%',

	display: 'block',
	backgroundColor: 'rgba(0, 0, 0, 0.1)',
});

export const SidebarOption = styled(Box)({
	position: 'relative',
	height: '35px',
	width: '100%',
	minWidth: '150px',

	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	gap: '5px',

	padding: '0 5px',
	margin: '0 1px',
	borderRadius: '4px',
	backgroundColor: 'white',
	cursor: 'pointer',
	userSelect: 'none',

	'&.sidebar-open': {
		margin: '0 5px',
	},

	'& .sidebar-menu-icon': {
		height: '35px',
		width: '35px',
	},
});
