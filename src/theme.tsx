import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		logo: React.CSSProperties;
		slogan: React.CSSProperties;
		cta: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		logo?: React.CSSProperties;
		slogan?: React.CSSProperties;
		cta?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		logo: true;
		slogan: true;
		cta: true;
	}
}

const theme = createTheme({
	palette: {
		primary: {
			light: '#15ebe2',
			main: '#07ebe3',
			dark: '#13d6ce',
		},
		secondary: {
			main: '#4B4E6D',
		},
		info: {
			main: '#EF476F',
		},
	},
	typography: {
		logo: {
			fontSize: '1.875rem',
			lineHeight: 1,
			fontWeight: 600,
			color: 'white',
		},
		slogan: {
			fontSize: '1rem',
			lineHeight: 1,
			fontWeight: 600,
			color: 'white',
		},
		cta: {
			fontSize: '1.25rem',
			lineHeight: 1.5,
		},
		fontFamily: [
			'Poppins',
			'Roboto',
			'-apple-system',
			'BlinkMacSystemFont',
			'Arial',
			'sans-serif',
		].join(','),
	},
});

export const Theme = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
