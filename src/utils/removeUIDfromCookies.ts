export const removeUIDfromCookies = () => {
	document.cookie = '_uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
