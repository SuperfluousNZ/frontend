import { RelationRelevance, TitleType } from "@/schemas/title";

export interface PreviewTitleDto {
	id: number;
	name: string;
	smallPosterUrl?: string;
	releasedAtUtc?: Date;
	type: TitleType;
}

export interface CommonTitleDto extends PreviewTitleDto {
	largePosterUrl?: string;
	description?: string;
	tmdbId?: number;
}

export interface DependencyOrderTitleDto extends CommonTitleDto {
	order: "relational";
	relations: {
		title: PreviewTitleDto;
		relevance: RelationRelevance;
	}[];
}

export interface SequentialOrderTitleDto extends CommonTitleDto {
	order: "sequential";
	orderId: number;
	previous?: PreviewTitleDto;
	next?: PreviewTitleDto;
}

export type TitleDto = DependencyOrderTitleDto | SequentialOrderTitleDto;
