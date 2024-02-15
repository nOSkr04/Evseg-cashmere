
import { ITransaction } from "../interface/transaction";
import { IUser } from "../interface/user";

export class Transaction implements ITransaction {
  createUser: IUser;
  receivedUser: IUser;
  isMinus: boolean;
  point: number;
  money: number;
  userFirstPoint: number;
  userLastPoint: number;
  createdAt: string;
  minusMoney: number;

  constructor({ 
    createUser,
     receivedUser,
    isMinus,
    point,
    money,
    userFirstPoint,
    userLastPoint,
    createdAt,
    minusMoney
  }: ITransaction) {
    this.createUser = createUser;
    this.receivedUser = receivedUser;
    this.isMinus = isMinus;
    this.point = point;
    this.money = money;
    this.userFirstPoint = userFirstPoint;
    this.userLastPoint = userLastPoint;
    this.createdAt = createdAt;
    this.minusMoney = minusMoney;
  }

  static fromJson(json: ITransaction) {
    return new Transaction(json);
  }
}
