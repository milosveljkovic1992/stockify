import { RefObject } from 'react';

export const checkRefs = (...refs: RefObject<HTMLInputElement>[]) => {
	for (const ref of refs) {
		if (!ref.current) return false;
	}
	return true;
};
