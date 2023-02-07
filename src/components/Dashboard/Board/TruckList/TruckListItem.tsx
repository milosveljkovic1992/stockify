import { useRef, useState } from 'react';

import { Check, Close, Delete, Edit } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { deleteDispatchedTruck } from 'store/trucks-slice';
import { TruckType, updateTruck } from 'store/truck-slice';
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

	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const originRef = useRef<HTMLInputElement>(null);
	const destinationRef = useRef<HTMLInputElement>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lengthRef = useRef<HTMLInputElement>(null);

	const toggleOpenEdit = () => {
		setIsEditOpen((isOpen) => !isOpen);
	};

	const handleDelete = (id: string) => {
		dispatch(deleteDispatchedTruck(id));
	};

	const handleSubmit = () => {
		const updatedTruck: TruckType = {
			...truck,
			origin: originRef.current?.value || '',
			destination: destinationRef.current?.value || '',
			weight: Number(weightRef.current?.value) || 0,
			length: Number(lengthRef.current?.value) || 0,
		};
		dispatch(updateTruck(updatedTruck));
		setIsEditOpen(false);
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
					<GridItem item>{origin}</GridItem>
					<GridItem item>{destination}</GridItem>
					<GridItem item>{weight}</GridItem>
					<GridItem item>{length}</GridItem>

					<GridItem
						item
						sx={{ gridColumnEnd: '-2' }}
						className="truck-table__action-icons"
						onClick={toggleOpenEdit}
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
				<>
					<GridItem item>
						<input defaultValue={origin} ref={originRef} />
					</GridItem>
					<GridItem item>
						<input defaultValue={destination} ref={destinationRef} />
					</GridItem>
					<GridItem item>
						<input defaultValue={weight} ref={weightRef} required />
					</GridItem>
					<GridItem item>
						<input defaultValue={length} ref={lengthRef} required />
					</GridItem>
					<GridItem
						item
						sx={{ gridColumnEnd: '-2' }}
						className="truck-table__action-icons"
						onClick={toggleOpenEdit}
					>
						<Close color="info" titleAccess="Cancel" />
					</GridItem>

					<GridItem
						item
						sx={{ gridColumnEnd: '-1' }}
						className="truck-table__action-icons"
						onClick={handleSubmit}
					>
						<Check color="success" titleAccess="Confirm" />
					</GridItem>
				</>
			)}
		</GridRow>
	);
};
