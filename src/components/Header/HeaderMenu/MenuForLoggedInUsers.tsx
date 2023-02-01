import { useState, MouseEvent } from 'react';

import {
	Box,
	Avatar,
	Grid,
	Menu,
	MenuItem,
	ListItemIcon,
	IconButton,
	Tooltip,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { styled } from '@mui/system';

import { logoutUser } from 'store/user-slice';
import { useAppDispatch } from 'store';
import { HeaderMenuItem } from './HeaderMenuItem';

const StyledBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	textAlign: 'center',
});

const StyledAvatar = styled(Avatar)({
	width: 36,
	height: 36,
	color: '#000',
	backgroundColor: 'white',
	outline: '2px solid #000',
});

export const MenuForLoggedInUsers = () => {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = async () => {
		handleClose();
		await dispatch(logoutUser());
	};

	return (
		<Grid container gap="15px">
			<StyledBox>
				<HeaderMenuItem to="/dashboard">Dashboard</HeaderMenuItem>

				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<StyledAvatar>M</StyledAvatar>
					</IconButton>
				</Tooltip>
			</StyledBox>

			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						width: 250,
						'& .MuiAvatar-root': {
							width: 36,
							height: 36,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 16,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Grid>
	);
};
