type User = {
    id: string;
    userName: string;
    password: string;
};

export interface IAuthenticate {
    readonly user: User;
    readonly token: string;
}
