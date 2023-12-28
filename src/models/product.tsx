import { IProduct } from "../interface/product";

export class Product implements IProduct {
  _id: string;
  name: string;

  constructor({ _id, name, }: IProduct) {
    this._id = _id;
    this.name = name;
  }

  static fromJson(json: IProduct) {
    return new Product(json);
  }
}
