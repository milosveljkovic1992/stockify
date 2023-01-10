import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

const theme = createTheme({
	palette: {
		primary: {
			light: '#15ebe2',
			main: '#07ebe3',
			dark: '#13d6ce',
		},
	},
});

export const Theme = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
