import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { freights } from 'data';
import { FreightItem } from './FreightItem';
import { FreightType } from './FreightItem.types';

export const Freight = () => {
	const currentTime: Date = new Date();

	return (
		<>
			<h1>Freight</h1>
			<TableContainer component={Paper} sx={{ padding: '5px' }}>
				<Table stickyHeader padding="none">
					<TableHead>
						<TableRow sx={{ fontWeight: 400 }}>
							<TableCell width="7.5%" sx={{ padding: '0 5px' }}>
								Posted
							</TableCell>
							<TableCell width="10%" sx={{ padding: '0 5px' }}>
								ID
							</TableCell>
							<TableCell width="15%" sx={{ padding: '0 5px' }}>
								From
							</TableCell>
							<TableCell width="15%" sx={{ padding: '0 5px' }}>
								To
							</TableCell>
							<TableCell width="7.5%" sx={{ padding: '0 5px' }}>
								Dist
							</TableCell>
							<TableCell width="15%" sx={{ padding: '0 5px' }}>
								Sender
							</TableCell>
							<TableCell width="7.5%" sx={{ padding: '0 5px' }}>
								Weight
							</TableCell>
							<TableCell width="12.5%" sx={{ padding: '0 5px' }}>
								Length
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{freights.map((freight: FreightType) => (
							<TableRow hover key={freight.freightID}>
								<FreightItem currentTime={currentTime} freight={freight} />
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
