import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
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
	const matches = useMediaQuery('(min-width: 480px)');
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		matches && setOpen(true);
	};

	const handleDrawerClose = () => {
		matches && setOpen(false);
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

			<SidebarOption>
				<ViewInAr className="sidebar-menu-icon" />
				<p>Option title</p>
			</SidebarOption>
			<SidebarOption>
				<EventNote className="sidebar-menu-icon" />
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
