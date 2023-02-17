import { useState, useEffect, useRef, forwardRef } from 'react';

import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

import { useDebounce } from 'hooks/useDebounce';
import { fetchCitiesByName } from '../../../../axios/fetchCitiesByName';
import { fetchCitiesByNameAndCountry } from '../../../../axios/fetchCitiesByNameAndCountry';
import type { City } from './Location.types';

interface Props {
	label: string;
	value?: City | null;
}

export const LocationAutocomplete = forwardRef<City | null, Props>(
	(props, ref) => {
		const [value, setValue] = useState<City | null>(props.value || null);
		const [inputValue, setInputValue] = useState('');
		const [options, setOptions] = useState<City[]>([]);
		const [isLoading, setIsLoading] = useState<boolean>(false);

		const previousValueRef = useRef<City | null>(null);
		const previousOptionsRef = useRef<City[] | null>(null);
		const isSelectedRef = useRef<boolean>(false);

		const debouncedValue = useDebounce(inputValue.trim(), 500);

		useEffect(() => {
			const controller = new AbortController();

			const fetchSuggestions = async () => {
				let cities: City[] | [] = [];
				const [cityName, countryName] = debouncedValue.split(',');

				if (countryName && countryName.trim().length === 2) {
					cities = await fetchCitiesByNameAndCountry(
						cityName.trim(),
						countryName.trim(),
						controller,
					);
				} else {
					cities = await fetchCitiesByName(cityName.trim(), controller);
				}

				setOptions(cities);
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
				getOptionLabel={(option) =>
					`${option.name}, ${option.country.code}${
						option.country.code === 'US' ? ` ${option.adminCode}` : ''
					}`
				}
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
					if (ref && typeof ref !== 'function') ref.current = newValue;
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
						label={props.label}
						fullWidth
						size="small"
						color="secondary"
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
										{option.country.code}
										{option.country.code === 'US' ? ` ${option.adminCode}` : ''}
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
