import { FormEvent, useRef, useState } from 'react';

import { Grid, MenuItem, TextField, Typography } from '@mui/material';

import { useAppDispatch } from 'store';
import {
	createTruck,
	TruckFormInput,
	TruckType,
	TruckTypeOptions,
} from 'store/truck-slice';

import { truckOptions } from 'global/truckOptions';
import { LocationAutocomplete } from './LocationAutocomplete';
import { Container, SubmitButton } from './DispatchForm.styles';
import type { City } from './Location.types';
import { useNavigate } from 'react-router-dom';

interface DispatchFormProps {
	closeForm: (miliseconds?: number) => void;
}

export const DispatchForm = ({ closeForm }: DispatchFormProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');

	const originRef = useRef<City | null>(null);
	const destinationRef = useRef<City | null>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lengthRef = useRef<HTMLInputElement>(null);
	const truckRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitStatus('sending');

		const weight = Number(weightRef.current?.value);
		const length = Number(lengthRef.current?.value);
		const truckOption = truckRef.current?.value as TruckTypeOptions;

		if (isNaN(weight) || isNaN(length)) {
			// handle invalid input
			if (weightRef.current && isNaN(weight)) {
				weightRef.current.value = '';
			}
			if (lengthRef.current && isNaN(length)) {
				lengthRef.current.value = '';
			}

			setSubmitStatus('error');
			setTimeout(() => {
				setSubmitStatus('idle');
			}, 1000);
			return;
		}

		if (!originRef.current || !destinationRef.current) {
			return;
		}

		const truck: TruckFormInput = {
			origin: originRef.current,
			destination: destinationRef.current,
			weight,
			length,
			truck: truckOption,
		};

		const data = await dispatch(createTruck(truck));
		const payload = data.payload as TruckType;

		setSubmitStatus('success');
		navigate(`${payload._id}`);
		closeForm();
	};

	return (
		<Container maxWidth={false}>
			<Typography component="p" mb={1}>
				Dispatch a vehicle
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					gap="10px"
					display="grid"
					gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
					gridTemplateRows="repeat(auto-fill, 40px)"
				>
					<Grid item position="relative">
						<LocationAutocomplete ref={originRef} label="Origin" />
					</Grid>

					<Grid item>
						<LocationAutocomplete ref={destinationRef} label="Destination" />
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
						<TextField
							select
							inputRef={truckRef}
							required
							fullWidth
							size="small"
							color="secondary"
							label="Truck"
							defaultValue=""
						>
							{truckOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item>
						<SubmitButton
							variant="outlined"
							color="secondary"
							fullWidth
							disableRipple
							type="submit"
							disabled={submitStatus !== 'idle'}
						>
							{submitStatus === 'idle' ? 'Submit' : submitStatus}
						</SubmitButton>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};
