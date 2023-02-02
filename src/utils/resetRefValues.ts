import { RefObject } from 'react';

export const resetRefValues = (...refs: RefObject<HTMLInputElement>[]) => {
	refs.forEach((ref) => {
		if (ref.current) ref.current.value = '';
	});
};
