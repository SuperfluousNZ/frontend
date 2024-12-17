enum TitleTypeEnum {
	Book = 'book',
	Game = 'game',
	Movie = 'movie',
	TvEpisode = 'tvEpisode',
	TvSeason = 'tvSeason',
	TvSeries = 'tvSeries',
}

enum RelationRelevanceEnum {
	Must = 'must',
	Should = 'should',
	Could = 'could',
}

export type TitleType = keyof typeof TitleTypeEnum;
export type RelationRelevance = keyof typeof RelationRelevanceEnum;
