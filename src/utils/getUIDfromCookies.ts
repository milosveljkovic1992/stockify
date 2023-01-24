export const getUIDfromCookies = () => {
	const cookies = document.cookie.split(';');
	const idCookie = cookies.reduce((acc, curr) => {
		if (curr.includes('_uid=')) {
			acc = curr.replace('_uid=', '');
		}
		return acc;
	}, '');

	return idCookie;
};
