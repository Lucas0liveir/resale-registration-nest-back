import { randomUUID } from "crypto";
import { Replace } from "@helpers/Replace";

export type AccountRole = "USER" | "ADMIN" | "RESELLER"

export interface UserProps {
    name: string;
    email: string;
    avatar?: string | null;
    password: string | null;
    role: AccountRole;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    _id: string;
    private props: UserProps;

    constructor(props: Replace<UserProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id;
    }

    public set name(name: string) {
        this.props.name = name
    }

    public get name(): string {
        return this.props.name;
    }

    public set email(email: string) {
        this.props.email = email
    }

    public get email(): string {
        return this.props.email;
    }

    public get role(): string {
        return this.props.role;
    }

    public set avatar(avatar: string) {
        this.props.avatar = avatar
    }

    public get avatar(): string {
        return this.props.avatar;
    }

    public set password(password: string) {
        this.props.password = password
    }

    public get password(): string {
        return this.props.password;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

}
