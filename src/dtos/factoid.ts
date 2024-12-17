import { TopicDto } from "./";

export interface FactoidDto {
	id: number;
	description: string;
	topics: TopicDto[];
}
