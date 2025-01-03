import type { Document } from "@contentful/rich-text-types";

export interface IVideoEvent {
	id: string;
	title?: string;
	thumbnailOffset: number;
}

export interface IArticleEvent {
	title?: string;
	subtitle?: string;
	thumbnail?: string;
	body?: {
		json: Document;
	};
}

export enum EventType {
	Article = "Article",
	Video = "Video",
}

export interface IEvent<T = IArticleEvent | IVideoEvent> {
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
