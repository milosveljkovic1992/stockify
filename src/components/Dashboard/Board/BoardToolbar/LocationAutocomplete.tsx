import { useState, useEffect, useRef, forwardRef } from 'react';

import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import { useDebounce } from 'hooks/useDebounce';
import { fetchCitiesByName } from '../../../../axios/fetchCitiesByName';

export type City = {
	objectId: string;
	name: string;
	adminCode: string;
	country: {
		objectId: string;
	};
	[key: string]: unknown;
};

export const LocationAutocomplete = forwardRef<HTMLInputElement, unknown>(
	(_, ref) => {
		const [value, setValue] = useState<City | null>(null);
		const [inputValue, setInputValue] = useState('');
		const [options, setOptions] = useState<City[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(true);
		const previousValueRef = useRef<City | null>(null);
		const previousOptionsRef = useRef<City[] | null>(null);
		const isSelectedRef = useRef<boolean>(false);

		const debouncedValue = useDebounce(inputValue.trim(), 500);

		useEffect(() => {
			const controller = new AbortController();

			const fetchSuggestions = async () => {
				const cityName = debouncedValue.split(',')[0].trim();
				const cities = await fetchCitiesByName(cityName, controller);
				if (cities) {
					setOptions(cities);
				} else {
					setOptions([]);
				}
				setIsLoading(false);
			};

			if (debouncedValue.length > 2 && !isSelectedRef.current) {
				setIsLoading(true);
				fetchSuggestions();
			}

			return () => controller.abort();
		}, [debouncedValue]);

		return (
			<Autocomplete
				id="origin-city-dispatch"
				autoComplete
				value={value}
				options={options}
				filterOptions={(x) => x}
				getOptionLabel={(option) => `${option.name}, ${option.adminCode}`}
				isOptionEqualToValue={(option, value) => {
					if (!options.find(({ objectId }) => objectId === value.objectId)) {
						return previousValueRef.current?.objectId === value.objectId;
					}
					return option.objectId === value.objectId;
				}}
				loading={isLoading}
				loadingText="Loading..."
				noOptionsText="No locations"
				onChange={(_, newValue: City | null) => {
					setValue(newValue);
				}}
				onInputChange={(event, newInputValue) => {
					if (event) {
						if (event.type === 'click') {
							isSelectedRef.current = true;
						} else {
							previousValueRef.current = value;
							previousOptionsRef.current = options;
							isSelectedRef.current = false;
							setOptions([]);
						}
						setInputValue(newInputValue);
					}
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Add a location"
						fullWidth
						size="small"
						inputRef={ref}
					/>
				)}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.objectId}>
							<Grid container alignItems="center">
								<Grid item sx={{ display: 'flex', width: 44 }}>
									<LocationOn sx={{ color: 'text.secondary' }} />
								</Grid>
								<Grid
									item
									sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
								>
									<Box component="span">{option.name}</Box>
									<Typography variant="body2" color="text.secondary">
										{option.adminCode}
									</Typography>
								</Grid>
							</Grid>
						</li>
					);
				}}
			/>
		);
	},
);

LocationAutocomplete.displayName = 'LocationAutocomplete';
