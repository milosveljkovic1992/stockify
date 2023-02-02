import { FormEvent, useRef } from 'react';

import {
	Button,
	Container as MUIContainer,
	Grid,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(MUIContainer)({
	paddingTop: '5px',
	paddingBottom: '5px',
	marginTop: '10px',
	borderRadius: '4px',
	border: '1px solid #ccc',
});

export const DispatchForm = () => {
	const fromRef = useRef<HTMLInputElement>(null);
	const toRef = useRef<HTMLInputElement>(null);
	const weightRef = useRef<HTMLInputElement>(null);
	const lenghtRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!fromRef.current) return;
		if (!toRef.current) return;
		if (!weightRef.current) return;
		if (!lenghtRef.current) return;

		console.log('sent');
	};

	return (
		<Container>
			<Typography component="p">Dispatch a vehicle</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container gap="10px">
					<Grid item>
						<input type="text" placeholder="From" ref={fromRef} />
					</Grid>

					<Grid item>
						<input type="text" placeholder="To" ref={toRef} />
					</Grid>

					<Grid item>
						<input type="text" placeholder="Max weight" ref={weightRef} />
					</Grid>

					<Grid item>
						<input type="text" placeholder="Max length" ref={lenghtRef} />
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
