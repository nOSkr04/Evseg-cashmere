import { IUser } from "../interface/user";

export class User implements IUser {
  _id: string;
  firstName: string;
  lastName: string;

  constructor({ _id, firstName, lastName }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
