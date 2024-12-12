import { TitleType } from "@/schemas/title";

export interface Title {
	id: number;
	name: string;
	largePosterUrl?: string;
	smallPosterUrl?: string;
	releasedAtUtc?: Date;
	description?: string;
	type: TitleType;
	tmdbId?: number;
}
