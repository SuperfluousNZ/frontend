import { RelationRelevance, TitleType } from "@/schemas/title";
import { FactoidDto } from "./";

export interface TitleDto {
	id: number;
	name: string;
	largePosterUrl?: string;
	smallPosterUrl?: string;
	releasedAtUtc?: Date;
	description?: string;
	type: TitleType;
	tmdbId?: number;
	factoids: FactoidDto[];

	relations: {
		title: TitleDto;
		relevance: RelationRelevance;
	}[];

	sequences: {
		// rename??
		orderId: number;
		previous?: TitleDto;
		next?: TitleDto;
	}[];
}
