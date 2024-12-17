export type ValuesOf<T> = T[keyof T];

export const TitleType = {
	Book: 'book',
	Game: 'game',
	Movie: 'movie',
	TvEpisode: 'tvEpisode',
	TvSeason: 'tvSeason',
	TvSeries: 'tvSeries',
} as const;

export const RelationRelevanceEnum = {
	Must: 'must',
	Should: 'should',
	Could: 'could',
} as const;

export type TitleType = ValuesOf<typeof TitleType>;
export type RelationRelevance = ValuesOf<typeof RelationRelevanceEnum>;
