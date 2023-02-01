import { parseAsClock } from 'utils/parseAsClock';
import { FreightGridItem, FreightGridRow } from './Freight.styles';
import type { FreightType } from './Freight.types';

interface FreightItemProps {
	hours: number;
	minutes: number;
	freight: FreightType;
}

export const FreightItem = ({ hours, minutes, freight }: FreightItemProps) => {
	const time = `${parseAsClock(hours)}:${parseAsClock(minutes)}`;

	return (
		<FreightGridRow item container>
			<FreightGridItem className="monospace-font">{time}</FreightGridItem>

			<FreightGridItem>{freight.freightID}</FreightGridItem>

			<FreightGridItem>{freight.origin}</FreightGridItem>

			<FreightGridItem>{freight.destination}</FreightGridItem>

			<FreightGridItem>{freight.distance}</FreightGridItem>

			<FreightGridItem>{freight.sender}</FreightGridItem>

			<FreightGridItem>{freight.weight}</FreightGridItem>

			<FreightGridItem>{freight.length}</FreightGridItem>
		</FreightGridRow>
	);
};
