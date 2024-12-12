enum TitleTypeEnum {
	Movie = 'movie',
	TvSeries = 'tvSeries',
	TvSeason = 'tvSeason',
	TvEpisode = 'tvEpisode',
	Book = 'book',
	Game = 'game'
}

export type TitleType = keyof typeof TitleTypeEnum;
