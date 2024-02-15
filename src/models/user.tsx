import { IUser } from "../interface/user";

export class User implements IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationalId: string;
  userType: "admin" | "operator" | "driver" | "user" | "guide";
  point: number;
  bankName: string;
  bankNumber: string;
  money: number;
  expoPushToken: string;
  role: string;
  moneySpent: number;
  loyaltyPercent: number;

  constructor({
    _id,
    firstName,
    lastName,
    phone,
    nationalId,
    userType,
    point,
    bankName,
    bankNumber,
    money,
    expoPushToken,
    role,
    moneySpent,
    loyaltyPercent,
  }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.nationalId = nationalId;
    this.userType = userType;
    this.point = point;
    this.bankName = bankName;
    this.bankNumber = bankNumber;
    this.money = money;
    this.expoPushToken = expoPushToken;
    this.role = role;
    this.moneySpent = moneySpent;
    this.loyaltyPercent = loyaltyPercent;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
