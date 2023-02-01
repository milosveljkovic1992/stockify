import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const FreightGridRow = styled(Grid)({
	display: 'grid',
	gridTemplateColumns: '75px repeat(7, minmax(110px, 1fr))',
	cursor: 'pointer',
	userSelect: 'none',

	'&:not(.freight-table-header)': {
		borderTop: '1px solid #ccc',
		'&:hover': {
			backgroundColor: '#f9f9f9',
		},
	},
});

export const FreightGridItem = styled(Grid)({
	padding: '2px 5px',

	'&.freight-table-header__sort-item:hover': {
		backgroundColor: '#f9f9f9',
	},

	'&.monospace-font': {
		fontFamily: "'Roboto Mono', monospace",
		letterSpacing: -1,
	},
});
