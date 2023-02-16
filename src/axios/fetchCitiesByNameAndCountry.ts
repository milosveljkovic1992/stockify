import axios from 'axios';
import type { City } from 'components/Dashboard/Board/BoardToolbar/Location.types';

export const fetchCitiesByNameAndCountry = async (
	cityName: string,
	countryName: string,
	controller: AbortController,
) => {
	try {
		const { data } = await axios(
			`/location/city/${cityName}?country=${countryName}`,
			{
				signal: controller.signal,
			},
		);
		return data as City[] | [];
	} catch (error: any) {
		if (error?.code !== 'ERR_CANCELED') {
			// handle error
			console.error(error);
		}
		return [];
	}
};
