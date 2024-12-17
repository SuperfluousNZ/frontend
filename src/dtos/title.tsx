import { ValuesOf } from ".";

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

export const TitleType = {
	Book: "book",
	Game: "game",
	Movie: "movie",
	TvEpisode: "tvEpisode",
	TvSeason: "tvSeason",
	TvSeries: "tvSeries",
} as const;

export const RelationRelevanceEnum = {
	Must: "must",
	Should: "should",
	Could: "could",
} as const;

export type TitleType = ValuesOf<typeof TitleType>;
export type RelationRelevance = ValuesOf<typeof RelationRelevanceEnum>;
