import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const Inner = styled('div')({
	border: '1px solid #ccc',
	borderRadius: '4px',
});

export const GridRow = styled(Grid)({
	display: 'grid',
	gridTemplateColumns: '60px repeat(auto-fit, minmax(110px, 1fr)) 75px',
	padding: '0 5px',

	'&:not(.truck-table-header)': {
		gridTemplateColumns: '60px repeat(auto-fit, minmax(110px, 1fr)) 35px 35px',
		borderTop: '1px solid #ccc',
	},

	'.truck-table-icon': {
		height: '1em',
		width: '1em',
	},
});

export const GridItem = styled(Grid)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	padding: '5px',
	cursor: 'default',

	'&.monospace-font': {
		fontFamily: "'Roboto Mono', monospace",
		letterSpacing: -1,
	},

	'&.truck-table__action-icons': {
		cursor: 'pointer',
		justifyContent: 'center',

		'&:hover': {
			backgroundColor: '#f9f9f9',
		},
	},
});
