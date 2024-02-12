import { IProduct } from "../interface/product";

export class Product implements IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  
  constructor({ _id, name,image,price }: IProduct) {
    this._id = _id;
    this.name = name;
    this.image = image;
    this.price = price;
  }

  static fromJson(json: IProduct) {
    return new Product(json);
  }
}
