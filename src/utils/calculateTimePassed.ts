export const calculateTimePassed = (time: Date, currentTime: Date) => {
	const secondsDiff = (currentTime.getTime() - time.getTime()) / 1000;
	const secondsPassed = Math.floor(secondsDiff) % 60;
	const minutesPassed = Math.floor((secondsDiff % 3600) / 60);
	const hoursPassed = Math.floor(secondsDiff / 3600);

	return {
		hours: hoursPassed,
		minutes: minutesPassed,
		seconds: secondsPassed,
	};
};
