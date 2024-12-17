export interface OrderDto {
	id: number;
	collectionId?: number;
  name: string;
	description?: string;
	isVerified: boolean;
	createdById?: number;
}
