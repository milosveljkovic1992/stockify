import { useAppDispatch } from 'store';
import { Delete, Edit } from '@mui/icons-material';

import { deleteDispatchedTruck } from 'store/trucks-slice';
import type { TruckType } from 'store/truck-slice';
import { parseAsClock } from 'utils/parseAsClock';

import { GridItem, GridRow } from './TruckList.styles';

interface TruckListItemProps {
	truck: TruckType;
	hours: number;
	minutes: number;
}

export const TruckListItem = ({
	truck,
	hours,
	minutes,
}: TruckListItemProps) => {
	const dispatch = useAppDispatch();
	const { origin, destination, weight, length } = truck;
	const time = `${parseAsClock(hours)}:${parseAsClock(minutes)}`;

	const handleDelete = (id: string) => {
		dispatch(deleteDispatchedTruck(id));
	};

	return (
		<GridRow item container>
			<GridItem
				item
				sx={{ justifyContent: 'center' }}
				className="monospace-font"
			>
				{time}
			</GridItem>
			<GridItem item>{origin}</GridItem>
			<GridItem item>{destination}</GridItem>
			<GridItem item>{weight}</GridItem>
			<GridItem item>{length}</GridItem>
			<GridItem
				item
				sx={{ gridColumnEnd: '-2' }}
				className="truck-table__action-icons"
			>
				<Edit color="info" />
			</GridItem>
			<GridItem
				item
				sx={{ gridColumnEnd: '-1' }}
				className="truck-table__action-icons"
				onClick={() => handleDelete(truck._id)}
			>
				<Delete color="warning" />
			</GridItem>
		</GridRow>
	);
};
