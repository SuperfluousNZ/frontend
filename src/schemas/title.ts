const titleTypeEnum = {
	type: 'string',
	enum: ['movie', 'tvSeries', 'tvSeason', 'tvEpisode', 'book', 'game'],
};

export type TitleType = keyof typeof titleTypeEnum;
