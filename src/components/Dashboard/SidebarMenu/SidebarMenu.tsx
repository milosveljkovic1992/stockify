import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import {
	ChevronLeft,
	EventNote,
	Factory,
	Groups,
	Menu,
	Notifications,
	PriceChange,
	ViewInAr,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

import { Container, Divider, SidebarOption } from './SidebarMenu.styles';

export const SidebarMenu = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const matches = useMediaQuery('(min-width: 480px)');
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		matches && setOpen(true);
	};

	const handleDrawerClose = () => {
		matches && setOpen(false);
	};

	const handleNavigateBoard = () => {
		if (location.pathname !== '/dashboard/board') navigate('/dashboard/board');
		setOpen(false);
	};

	return (
		<Container open={open}>
			{matches && (
				<SidebarOption className="sidebar-option-without-text">
					{!open ? (
						<Menu onClick={handleDrawerOpen} className="sidebar-menu-icon" />
					) : (
						<ChevronLeft
							onClick={handleDrawerClose}
							className="sidebar-menu-icon"
						/>
					)}
				</SidebarOption>
			)}

			<Divider />

			<SidebarOption onClick={handleNavigateBoard}>
				<EventNote className="sidebar-menu-icon" />
				<p>Board</p>
			</SidebarOption>
			<SidebarOption>
				<ViewInAr className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
			<SidebarOption>
				<Factory className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
			<SidebarOption>
				<Groups className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
			<SidebarOption>
				<PriceChange className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
			<SidebarOption>
				<Notifications className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
		</Container>
	);
};
