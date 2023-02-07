import { useState } from 'react';

import { Container } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';

import { DefaultButton } from 'components/shared';
import { DispatchForm } from './DispatchForm';

export const BoardToolbar = () => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	return (
		<Container maxWidth={false} sx={{ marginBottom: '20px' }}>
			<DefaultButton
				onClick={() => setIsFormOpen((isOpen) => !isOpen)}
				sx={{ padding: '0.5em 1em', fontSize: '0.75rem' }}
			>
				<LocalShipping fontSize="small" sx={{ marginRight: '5px' }} /> Dispatch
			</DefaultButton>

			{isFormOpen && <DispatchForm />}
		</Container>
	);
};
