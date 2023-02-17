import { FormEvent, useRef } from 'react';

import {
	Button,
	Container as MUIContainer,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { useAppDispatch } from 'store';
import { createTruck, TruckFormInput } from 'store/truck-slice';
import { resetRefValues } from 'utils/resetRefValues';

import { LocationAutocomplete } from './LocationAutocomplete';
import type { City } from './Location.types';

const Container = styled(MUIContainer)({
	paddingTop: '5px',
	paddingBottom: '5px',
	marginTop: '10px',
	borderRadius: '4px',
	border: '1px solid #ccc',
});

export const DispatchForm = () => {
	const dispatch = useAppDispatch();
	const originRef = useRef<City | null>(null);
	const destinationRef = useRef<City | null>(null);
	const distanceRef = useRef<HTMLInputElement>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lengthRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const distance = Number(distanceRef.current?.value);
		const weight = Number(weightRef.current?.value);
		const length = Number(lengthRef.current?.value);

		if (isNaN(distance) || isNaN(weight) || isNaN(length)) {
			// handle invalid input
			return;
		}

		if (!originRef.current || !destinationRef.current) return;

		const truck: TruckFormInput = {
			origin: originRef.current,
			destination: destinationRef.current,
			distance,
			weight,
			length,
		};

		dispatch(createTruck(truck));
		originRef.current = null;
		destinationRef.current = null;
		resetRefValues(distanceRef, weightRef, lengthRef);
	};

	return (
		<Container maxWidth={false}>
			<Typography component="p">Dispatch a vehicle</Typography>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					gap="10px"
					display="grid"
					gridTemplateColumns="repeat(2, minmax(300px, 1fr)) repeat(auto-fit, minmax(100px, 1fr)) 70px"
				>
					<Grid item position="relative">
						<LocationAutocomplete ref={originRef} label="Add origin" />
					</Grid>

					<Grid item>
						<LocationAutocomplete
							ref={destinationRef}
							label="Add destination"
						/>
					</Grid>

					<Grid item>
						<TextField
							type="text"
							inputRef={distanceRef}
							required
							fullWidth
							size="small"
							color="secondary"
							label="Max distance (km)"
						/>
					</Grid>

					<Grid item>
						<TextField
							type="text"
							inputRef={weightRef}
							required
							fullWidth
							size="small"
							color="secondary"
							label="Max weight (kg)"
						/>
					</Grid>

					<Grid item>
						<TextField
							type="text"
							inputRef={lengthRef}
							required
							fullWidth
							size="small"
							color="secondary"
							label="Max length (m)"
						/>
					</Grid>

					<Grid item>
						<Button
							variant="outlined"
							color="secondary"
							sx={{
								fontSize: '0.875rem',
								lineHeight: '1.625',
								fontWeight: '600',
								padding: '0 5px',
								borderWidth: '1px',
								height: '100%',
							}}
							fullWidth
							disableRipple
							type="submit"
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};
