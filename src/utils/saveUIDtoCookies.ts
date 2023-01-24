export const saveUIDtoCookies = (id: string) => {
	document.cookie = `_uid=${id}; path=/; max-age=${60 * 60 * 24}`;
};
