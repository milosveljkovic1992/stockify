import { useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { deleteDispatchedTruck } from 'store/trucks-slice';
import type { TruckType } from 'store/truck-slice';
import { parseAsClock } from 'utils/parseAsClock';

import { GridItem, GridRow } from './TruckList.styles';
import { EditTruckListItem } from './EditTruckListItem';

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
	const { origin, destination, weight, length, truck: truckType } = truck;
	const time = `${parseAsClock(hours)}:${parseAsClock(minutes)}`;

	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

	const handleOpenEdit = () => {
		setIsEditOpen(true);
	};

	const handleCloseEdit = () => {
		setIsEditOpen(false);
	};

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

			{!isEditOpen ? (
				<>
					<GridItem item>
						{origin?.name},{' '}
						{origin?.country.code === 'US'
							? `US ${origin?.adminCode}`
							: origin?.country.code}
					</GridItem>
					<GridItem item>
						{destination?.name},{' '}
						{destination?.country.code === 'US'
							? `US ${destination?.adminCode}`
							: destination?.country.code}
					</GridItem>
					<GridItem item>{weight}</GridItem>
					<GridItem item>{length}</GridItem>
					<GridItem item>{truckType}</GridItem>

					<GridItem
						item
						sx={{ gridColumnEnd: '-2' }}
						className="truck-table__action-icons"
						onClick={handleOpenEdit}
					>
						<Edit color="info" titleAccess="Edit" />
					</GridItem>

					<GridItem
						item
						sx={{ gridColumnEnd: '-1' }}
						className="truck-table__action-icons"
						onClick={() => handleDelete(truck._id)}
					>
						<Delete color="warning" titleAccess="Delete" />
					</GridItem>
				</>
			) : (
				<EditTruckListItem truck={truck} handleCloseEdit={handleCloseEdit} />
			)}
		</GridRow>
	);
};
