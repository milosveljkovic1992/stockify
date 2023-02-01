import { useLayoutEffect, useRef, useState } from 'react';

import { Grid } from '@mui/material';
import { freights } from 'data';

import { calculateTimePassed } from 'utils/calculateTimePassed';
import { FreightItem } from './FreightItem';
import { Container, FreightGridItem, FreightGridRow } from './Freight.styles';
import type { FreightType, SortFreightType } from './Freight.types';

export const Freight = () => {
	const [freightList, setFreightList] = useState<FreightType[]>([]);
	const [sortParam, setSortParam] = useState('postTime');
	const sortAscending = useRef<boolean>(true);

	const currentTime: Date = new Date();

	const sortByTimestamp = (a: FreightType, b: FreightType) => {
		if (sortAscending.current) {
			return a.postTime.getTime() < b.postTime.getTime() ? 1 : -1;
		} else {
			return a.postTime.getTime() > b.postTime.getTime() ? 1 : -1;
		}
	};

	const handleSort = (param: SortFreightType) => {
		if (sortParam === param) {
			sortAscending.current = !sortAscending.current;
		} else {
			sortAscending.current = true;
		}

		const sortColumns = (a: FreightType, b: FreightType) => {
			if (sortAscending.current) {
				return a[param] < b[param] ? -1 : a[param] > b[param] ? 1 : 0;
			} else {
				return a[param] > b[param] ? -1 : a[param] < b[param] ? 1 : 0;
			}
		};

		if (param === 'postTime') {
			setFreightList((freightList) => [...freightList].sort(sortByTimestamp));
		} else {
			setFreightList((freightList) => [...freightList].sort(sortColumns));
		}
		setSortParam(param);
	};

	useLayoutEffect(() => {
		// fetch freights
		const sorted = [...freights].sort(sortByTimestamp);
		setFreightList(sorted);
	}, []);

	return (
		<>
			<h1>Freight</h1>
			<Container>
				<Grid container>
					<FreightGridRow item container className="freight-table-header">
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('postTime')}
						>
							Posted
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('freightID')}
						>
							ID
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('origin')}
						>
							From
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('destination')}
						>
							To
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('distance')}
						>
							Dist
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('sender')}
						>
							Sender
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('weight')}
						>
							Weight
						</FreightGridItem>
						<FreightGridItem
							item
							className="freight-table-header__sort-item"
							onClick={() => handleSort('length')}
						>
							Length
						</FreightGridItem>
					</FreightGridRow>

					{freightList.map((freight: FreightType) => {
						const { hours, minutes } = calculateTimePassed(
							freight.postTime,
							currentTime,
						);
						return (
							<FreightItem
								key={freight.freightID}
								hours={hours}
								minutes={minutes}
								freight={freight}
							/>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};
