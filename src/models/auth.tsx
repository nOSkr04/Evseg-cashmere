import { IAuth } from "../interface/auth";
import { IUser } from "../interface/user";

export class Auth implements IAuth {
  token: string | null;
  user: IUser | null;

  constructor({ token, user }: IAuth) {
    this.token = token;
    this.user = user;
  }

  static fromJson(json: IAuth) {
    return new Auth(json);
  }
}
