import { TableCell } from '@mui/material';

import { FreightType } from './FreightItem.types';

interface FreightItemProps {
	currentTime: Date;
	freight: FreightType;
}

export const FreightItem = ({ currentTime, freight }: FreightItemProps) => {
	const calculateTimePassed = (time: Date, currentTime: Date) => {
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

	const parseNumberAsClock = (time: number) => {
		return time < 10 ? `0${time.toString()}` : time.toString();
	};

	const { hours, minutes } = calculateTimePassed(freight.postTime, currentTime);
	const time = `${parseNumberAsClock(hours)}:${parseNumberAsClock(minutes)}`;

	return (
		<>
			<TableCell
				sx={{ fontFamily: "'Roboto Mono', monospace", padding: '0 5px' }}
			>
				{time}
			</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.freightID}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.origin}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.destination}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.distance}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.sender}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.weight}</TableCell>

			<TableCell sx={{ padding: '0 5px' }}>{freight.length}</TableCell>
		</>
	);
};
