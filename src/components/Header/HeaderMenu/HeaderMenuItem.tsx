import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const LinkStyleWrapper = styled('span')({
	'.header-menu-item': {
		textDecoration: 'none',
		padding: '8px 16px',
		borderRadius: '4px',
		transition: '0.1s ease-in-out',

		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.4)!important',
		},
	},
});

interface HeaderMenuItemProps {
	to: string;
	children: string;
}

export const HeaderMenuItem = ({ to, children }: HeaderMenuItemProps) => {
	return (
		<LinkStyleWrapper>
			<Link to={to} className="header-menu-item">
				{children}
			</Link>
		</LinkStyleWrapper>
	);
};
