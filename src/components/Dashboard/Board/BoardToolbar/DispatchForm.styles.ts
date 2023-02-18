import { Button, Container as MUIContainer } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(MUIContainer)({
	backgroundColor: 'white',
	paddingTop: '12px',
	paddingBottom: '12px',
	marginTop: '10px',
	borderRadius: '4px',
	border: '1px solid #ccc',
});

export const SubmitButton = styled(Button)({
	fontSize: '0.875rem',
	lineHeight: '1.625',
	fontWeight: '600',
	height: '100%',
	minHeight: '40px',
	padding: '0 5px',
	borderWidth: '1px',
});
