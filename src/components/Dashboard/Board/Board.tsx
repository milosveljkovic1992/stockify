import { BoardToolbar } from './BoardToolbar/BoardToolbar';
import { Freight } from './Freight/Freight';
import { TruckList } from './TruckList/TruckList';

export const Board = () => {
	return (
		<>
			<BoardToolbar />
			<TruckList />
			<Freight />
		</>
	);
};
