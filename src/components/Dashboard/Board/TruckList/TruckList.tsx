import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Timer } from '@mui/icons-material';

import { RootState, useAppDispatch } from 'store';
import { fetchDispatchedTrucks } from 'store/trucks-slice';
import { calculateTimePassed } from 'utils/calculateTimePassed';

import { TruckListItem } from './TruckListItem';
import { GridItem, GridRow, Inner } from './TruckList.styles';

export const TruckList = () => {
	const dispatch = useAppDispatch();
	const { isLoading, truckList } = useSelector(
		(state: RootState) => state.trucks,
	);

	const currentTime = new Date();

	useEffect(() => {
		const promise = dispatch(fetchDispatchedTrucks());

		return () => promise.abort();
	}, []);

	if (!isLoading && !truckList.length) return <></>;

	return (
		<Container
			maxWidth={false}
			sx={{ width: '100%', marginBottom: '20px', overflow: 'hidden' }}
		>
			<Inner sx={{ overflow: 'auto' }}>
				<Paper sx={{ minWidth: '1000px' }}>
					<Grid container>
						<GridRow item container className="truck-table-header">
							<GridItem item sx={{ display: 'flex', justifyContent: 'center' }}>
								<Timer className="truck-table-icon" />
							</GridItem>

							<GridItem item>
								<Typography>From</Typography>
							</GridItem>

							<GridItem item>
								<Typography>To</Typography>
							</GridItem>

							<GridItem item>
								<Typography>Weight</Typography>
							</GridItem>

							<GridItem item>
								<Typography>Length</Typography>
							</GridItem>

							<GridItem item sx={{ gridColumnEnd: '-1', textAlign: 'center' }}>
								<Typography>Actions</Typography>
							</GridItem>
						</GridRow>
					</Grid>
					{!isLoading &&
						[...truckList].reverse().map((truck) => {
							const truckTime = new Date(truck.updatedAt);
							const { hours, minutes } = calculateTimePassed(
								truckTime,
								currentTime,
							);

							return (
								<TruckListItem
									key={truck._id}
									truck={truck}
									hours={hours}
									minutes={minutes}
								/>
							);
						})}
				</Paper>
			</Inner>
		</Container>
	);
};
