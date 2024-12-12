import { TitleType } from "@/schemas/title";

export interface TitleDto {
	id: number;
	name: string;
	largePosterUrl?: string;
	smallPosterUrl?: string;
	releasedAtUtc?: Date;
	description?: string;
	type: TitleType;
	tmdbId?: number;
}
