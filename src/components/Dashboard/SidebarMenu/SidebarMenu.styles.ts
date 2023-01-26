import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ToggleProps {
	open: boolean;
}

export const Container = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'open',
})<ToggleProps>(({ open }) => ({
	position: 'absolute',
	height: '100%',
	width: '250px',
	transform: open ? 'translateX(0)' : 'translateX(-200px)',

	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	gap: '5px',

	padding: '5px',
	paddingRight: open ? '5px' : '0',
	backgroundColor: 'whitesmoke',
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
	height: '50px',
	width: '100%',

	display: 'flex',
	flexDirection: 'row-reverse',
	alignItems: 'center',
	gap: '5px',

	padding: '0 5px',
	borderRadius: '4px',
	backgroundColor: 'white',
	cursor: 'pointer',
	userSelect: 'none',

	'&.sidebar-option-without-text': {
		width: 'auto',
	},

	'& .sidebar-menu-icon': {
		height: '40px',
		width: '40px',
	},
});
