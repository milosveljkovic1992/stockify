import { Freight } from './Freight/Freight';
import { SectionTitle } from 'components/shared';

export const Board = () => {
	return (
		<>
			<SectionTitle>Board</SectionTitle>
			<div style={{ backgroundColor: 'lightblue', overflow: 'auto' }}>
				<Freight />
			</div>
		</>
	);
};
