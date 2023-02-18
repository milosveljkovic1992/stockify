import { useState } from 'react';

import { Container } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';

import { DefaultButton } from 'components/shared';
import { DispatchForm } from './DispatchForm';

export const BoardToolbar = () => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const closeFormWithDelay = (delay = 1000) => {
		setTimeout(() => {
			setIsFormOpen(false);
		}, delay);
	};

	return (
		<Container maxWidth={false} sx={{ marginBottom: '20px' }}>
			<DefaultButton
				onClick={() => setIsFormOpen((isOpen) => !isOpen)}
				sx={{ padding: '0.5em 1em', fontSize: '0.75rem' }}
			>
				<LocalShipping fontSize="small" sx={{ marginRight: '5px' }} /> Dispatch
			</DefaultButton>

			{isFormOpen && <DispatchForm closeForm={closeFormWithDelay} />}
		</Container>
	);
};
