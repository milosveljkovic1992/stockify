import { FormEvent, useRef } from 'react';

import {
	Button,
	Container as MUIContainer,
	Grid,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import { useAppDispatch } from 'store';
import { createTruck, TruckWithoutID } from 'store/truck-slice';
import { checkRefs } from 'utils/checkRefs';
import { resetRefValues } from 'utils/resetRefValues';

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

		const truck: TruckWithoutID = {
			origin: originRef.current?.value || '',
			destination: destinationRef.current?.value || '',
			weight,
			length,
		};

		dispatch(createTruck(truck));
		resetRefValues(originRef, destinationRef, weightRef, lenghtRef);
	};

	return (
		<Container>
			<Typography component="p">Dispatch a vehicle</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container gap="10px">
					<Grid item>
						<input type="text" placeholder="From" ref={originRef} />
					</Grid>

					<Grid item>
						<input type="text" placeholder="To" ref={destinationRef} />
					</Grid>

					<Grid item>
						<input
							type="text"
							placeholder="Max weight (kg)"
							ref={weightRef}
							required
						/>
					</Grid>

					<Grid item>
						<input
							type="text"
							placeholder="Max length (m)"
							ref={lenghtRef}
							required
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
							}}
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
