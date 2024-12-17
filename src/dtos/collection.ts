import { TitleDto } from "./title";

export interface CollectionDto {
	id: number;
	name: string;
	isVerified: boolean;
	titles: TitleDto[];
}
