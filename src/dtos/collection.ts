import { TitleDto } from "./";

export interface CollectionDto {
	id: number;
	name: string;
	isVerified: boolean;
	titles: TitleDto[];
}
