import { useRef } from 'react';

import { MenuItem, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

import { useAppDispatch } from 'store';
import { TruckType, TruckTypeOptions, updateTruck } from 'store/truck-slice';

import { truckOptions } from 'global/truckOptions';
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
	const { origin, destination, weight, length, truck: truckOption } = truck;

	const originRef = useRef<City | null>(origin);
	const destinationRef = useRef<City | null>(destination);
	const weightRef = useRef<HTMLInputElement>(null);
	const lengthRef = useRef<HTMLInputElement>(null);
	const truckRef = useRef<HTMLInputElement>(null);
	const defaultTruckOption = useRef<TruckTypeOptions>(truckOption);

	const handleSubmit = async () => {
		if (!originRef.current || !destinationRef.current || !truckRef.current) {
			return;
		}

		const updatedTruck: TruckType = {
			...truck,
			origin: originRef.current,
			destination: destinationRef.current,
			weight: Number(weightRef.current?.value) || 0,
			length: Number(lengthRef.current?.value) || 0,
			truck: truckRef.current.value as TruckTypeOptions,
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
			<GridItem item className="full-width">
				<TextField
					select
					inputRef={truckRef}
					defaultValue={defaultTruckOption.current}
					required
					fullWidth
					size="small"
					color="secondary"
					label=""
				>
					{truckOptions.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
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
