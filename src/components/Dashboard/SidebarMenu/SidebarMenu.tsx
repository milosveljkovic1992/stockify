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

import { Container, Divider, SidebarOption } from './SidebarMenu.styles';

export const SidebarMenu = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const toggleSidebarMenu = () => {
		setOpen((isOpen) => !isOpen);
	};

	const handleNavigateBoard = () => {
		if (location.pathname !== '/dashboard/board') navigate('/dashboard/board');
		if (open) setOpen(false);
	};

	return (
		<Container open={open}>
			<SidebarOption
				className={`sidebar-option-without-text ${open ? 'sidebar-open' : ''}`}
				onClick={toggleSidebarMenu}
			>
				{!open ? (
					<Menu className="sidebar-menu-icon" />
				) : (
					<>
						<ChevronLeft className="sidebar-menu-icon" />
						<p>Hide</p>
					</>
				)}
			</SidebarOption>

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
