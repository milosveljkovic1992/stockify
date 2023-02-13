import { FormEvent, useRef } from 'react';

import {
	Autocomplete,
	Button,
	Container as MUIContainer,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { useAppDispatch } from 'store';
import { createTruck, TruckFormInput } from 'store/truck-slice';
import { checkRefs } from 'utils/checkRefs';
import { resetRefValues } from 'utils/resetRefValues';
import { LocationAutocomplete } from './LocationAutocomplete';

const Container = styled(MUIContainer)({
	paddingTop: '5px',
	paddingBottom: '5px',
	marginTop: '10px',
	borderRadius: '4px',
	border: '1px solid #ccc',
});

export const DispatchForm = () => {
	const dispatch = useAppDispatch();
	const originRef = useRef<HTMLInputElement>(null);
	const destinationRef = useRef<HTMLInputElement>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lenghtRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const validRefs = checkRefs(
			originRef,
			destinationRef,
			weightRef,
			lenghtRef,
		);
		if (!validRefs) return;

		const weight = Number(weightRef.current?.value);
		const length = Number(lenghtRef.current?.value);

		if (isNaN(weight) || isNaN(length)) {
			// handle invalid input
			return;
		}

		const truck: TruckFormInput = {
			origin: originRef.current?.value || '',
			destination: destinationRef.current?.value || '',
			weight,
			length,
		};

		dispatch(createTruck(truck));
		resetRefValues(originRef, destinationRef, weightRef, lenghtRef);
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
						<LocationAutocomplete ref={originRef} />
					</Grid>

					<Grid item>
						<Autocomplete
							blurOnSelect
							fullWidth
							options={['something1', 'something2', 'something3']}
							filterOptions={(x) => x}
							renderInput={(params) => (
								<TextField {...params} label="From" size="small" />
							)}
						/>
					</Grid>

					<Grid item>
						<TextField
							type="text"
							ref={weightRef}
							required
							fullWidth
							size="small"
							label="Max weight (kg)"
						/>
					</Grid>

					<Grid item>
						<TextField
							type="text"
							ref={lenghtRef}
							required
							fullWidth
							size="small"
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
