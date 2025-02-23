import { PreviewTitleDto } from "./title";

export interface CollectionDto {
	id: number;
	name: string;
	isVerified: boolean;
	titles: PreviewTitleDto[];
}
