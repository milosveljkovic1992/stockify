export type City = {
	objectId: string;
	name: string;
	adminCode: string;
	country: {
		objectId: string;
		name: string;
		code: string;
	};
	[key: string]: unknown;
};
