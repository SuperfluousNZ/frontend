enum TitleTypeEnum {
	Book = 'book',
	Game = 'game',
	Movie = 'movie',
	TvEpisode = 'tvEpisode',
	TvSeason = 'tvSeason',
	TvSeries = 'tvSeries',
}

export type TitleType = keyof typeof TitleTypeEnum;
