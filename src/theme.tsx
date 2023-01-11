import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

declare module '@mui/material/styles' {
	interface TypographyVariants {
		logo: React.CSSProperties;
		slogan: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		logo?: React.CSSProperties;
		slogan?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		logo: true;
		slogan: true;
	}
}

const theme = createTheme({
	palette: {
		primary: {
			light: '#15ebe2',
			main: '#07ebe3',
			dark: '#13d6ce',
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
	},
});

export const Theme = ({ children }: { children: ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
