export const parseAsClock = (time: number) => {
	return time < 10 ? `0${time.toString()}` : time.toString();
};
