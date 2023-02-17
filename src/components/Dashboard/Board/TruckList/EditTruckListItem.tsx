import { useRef } from 'react';

import { TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { TruckType, updateTruck } from 'store/truck-slice';

import { LocationAutocomplete } from 'components/Dashboard/Board/BoardToolbar/LocationAutocomplete';
import type { City } from 'components/Dashboard/Board/BoardToolbar/Location.types';
import { GridItem } from './TruckList.styles';

interface EditTruckListItemProps {
	truck: TruckType;
	handleCloseEdit: () => void;
}

export const EditTruckListItem = ({
	truck,
	handleCloseEdit,
}: EditTruckListItemProps) => {
	const dispatch = useAppDispatch();
	const { origin, destination, distance, weight, length } = truck;

	const originRef = useRef<City | null>(origin);
	const destinationRef = useRef<City | null>(destination);
	const distanceRef = useRef<HTMLInputElement>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lengthRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		if (!originRef.current || !destinationRef.current) return;

		const updatedTruck: TruckType = {
			...truck,
			origin: originRef.current,
			destination: destinationRef.current,
			distance: Number(distanceRef.current?.value) || 0,
			weight: Number(weightRef.current?.value) || 0,
			length: Number(lengthRef.current?.value) || 0,
		};
		await dispatch(updateTruck(updatedTruck));
		handleCloseEdit();
	};

	return (
		<>
			<GridItem item className="full-width">
				<LocationAutocomplete ref={originRef} value={origin} label="" />
			</GridItem>
			<GridItem item className="full-width">
				<LocationAutocomplete
					ref={destinationRef}
					value={destination}
					label=""
				/>
			</GridItem>
			<GridItem item className="full-width">
				<TextField
					type="text"
					inputRef={distanceRef}
					defaultValue={distance}
					required
					fullWidth
					size="small"
					color="secondary"
					label=""
				/>
			</GridItem>
			<GridItem item className="full-width">
				<TextField
					type="text"
					inputRef={weightRef}
					defaultValue={weight}
					required
					fullWidth
					size="small"
					color="secondary"
					label=""
				/>
			</GridItem>
			<GridItem item className="full-width">
				<TextField
					type="text"
					inputRef={lengthRef}
					defaultValue={length}
					required
					fullWidth
					size="small"
					color="secondary"
					label=""
				/>
			</GridItem>
			<GridItem
				item
				sx={{ gridColumnEnd: '-2' }}
				className="truck-table__action-icons"
				onClick={handleCloseEdit}
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
	);
};
