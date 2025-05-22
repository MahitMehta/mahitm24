import type { Document } from "@contentful/rich-text-types";

export interface IVideoEvent {
	id: string;
	title?: string;
	thumbnailOffset: number;
}

export enum EMediaType {
	Image = "Image",
	Video = "Video",
}

export interface IMedia {
	id: string;
	type: EMediaType;
	sys: {
		id: string;
	};
	thumbnailOffset: number;
}

export interface IHighlightedMediaCollection {
	items: IMedia[];
}

export interface IArticleEvent {
	highlightedMediaCollection: IHighlightedMediaCollection;
	title?: string;
	subtitle?: string;
	thumbnail?: string;
	body?: {
		json: Document;
	};
}

export interface ISongEvent {
	spotifyId: string;
	title?: string;
}

export enum EventType {
	Article = "Article",
	Video = "Video",
	Song = "Song",
}

export interface IEvent<T = IArticleEvent | IVideoEvent | ISongEvent> {
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
		total: number;
		items: IEvent[];
	};
}
