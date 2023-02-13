import axios from 'axios';

export const fetchCountryAdminCode = async (
	id: string,
	controller: AbortController,
) => {
	try {
		const { data } = await axios(`/location/country/${id}`, {
			signal: controller.signal,
		});
		return data.code as string;
	} catch (error: any) {
		if (error.code !== 'ERR_CANCELED') {
			// handle error
			console.error(error);
		}
	}
};
