import axios from 'axios';
import { City } from 'components/Dashboard/Board/BoardToolbar/LocationAutocomplete';

export const fetchCitiesByName = async (
	cityName: string,
	controller: AbortController,
) => {
	try {
		const { data } = await axios(`/location/city/${cityName}`, {
			signal: controller.signal,
		});
		return data as City[];
	} catch (error: any) {
		if (error?.code !== 'ERR_CANCELED') {
			// handle error
			console.error(error);
		}
	}
};
