export interface IVideoEvent {
	id: string;
	title?: string;
}

export interface IBlogEvent {
	title?: string;
	subtitle?: string;
	thumbnail?: string;
}

export enum EventType {
	Blog = "Blog",
	Video = "Video",
}

export interface IEvent<T = IBlogEvent | IVideoEvent> {
	sys: {
		id: string;
	};
	type: EventType;
	slug: string;
	published: string;
	content: T;
}

export interface IEventCollection {
	eventCollection: {
		items: IEvent[];
	};
}
