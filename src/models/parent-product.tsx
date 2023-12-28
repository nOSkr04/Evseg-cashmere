import { IParentProduct } from "../interface/parent-product";
import { IProduct } from "../interface/product";

export class ParentProduct implements IParentProduct {
  _id: string;
  name: string;
  data: IProduct[];

  constructor({ _id, name, data }: IParentProduct) {
    this._id = _id;
    this.name = name;
    this.data = data;
  }

  static fromJson(json: IParentProduct) {
    return new ParentProduct(json);
  }
}
