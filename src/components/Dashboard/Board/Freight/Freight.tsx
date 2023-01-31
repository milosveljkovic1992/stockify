import { useLayoutEffect, useRef, useState } from 'react';

import {
	Paper,
	Table,
	TableBody,
	TableCell as MUITableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import { freights } from 'data';

import { FreightItem } from './FreightItem';
import type { FreightType, SortFreightType } from './Freight.types';

const TableCell = styled(MUITableCell)({
	padding: '0 5px',
});

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
			<TableContainer component={Paper} sx={{ padding: '5px' }}>
				<Table stickyHeader padding="none">
					<TableHead>
						<TableRow
							sx={{
								fontWeight: 400,
								cursor: 'pointer',
								userSelect: 'none',
							}}
						>
							<TableCell width="75px" onClick={() => handleSort('postTime')}>
								Posted
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('freightID')}>
								ID
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('origin')}>
								From
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('destination')}>
								To
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('distance')}>
								Dist
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('sender')}>
								Sender
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('weight')}>
								Weight
							</TableCell>
							<TableCell width="auto" onClick={() => handleSort('length')}>
								Length
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{freightList.map((freight: FreightType) => (
							<TableRow hover key={freight.freightID}>
								<FreightItem currentTime={currentTime} freight={freight} />
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
