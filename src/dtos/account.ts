export interface AccountDto {
	id: number;
	username: string;
	role: "admin" | "user"; // TODO: turn into a proper enum later
}
