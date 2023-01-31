export type FreightType = {
	freightID: string;
	postTime: Date;
	weight: number;
	length: number;
	status: string;
	supplier: string;
	sender: string;
	orderer: string;
	deliverer: string;
	origin: string;
	destination: string;
	distance: string;
	pickupDate: string;
	pickupTimeStart: string;
	pickupTimeEnd: string;
	deliveryDate: string;
	deliveryTimeStart: string;
	deliveryTimeEnd: string;
	purchasePrice: number;
	orderPrice: number;
	priceMargin: number;
	commodity: string;
	contact: string;
	comments: string[] | never[];
};

export type SortFreightType =
	| 'postTime'
	| 'freightID'
	| 'origin'
	| 'destination'
	| 'distance'
	| 'sender'
	| 'weight'
	| 'length';
