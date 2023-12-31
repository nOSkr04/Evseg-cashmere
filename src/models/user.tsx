import { IUser } from "../interface/user";

enum UserType {
  "admin",
  "operator",
  "driver"
}
export class User implements IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationalId: string;
  userType: "admin" | "operator" | "driver" | "user"
  point: number

  constructor({ _id, firstName, lastName, phone, nationalId,userType,point }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.nationalId = nationalId;
    this.userType = userType;
    this.point = point;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
