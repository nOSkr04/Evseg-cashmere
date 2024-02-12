import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};

export const findUser = async (id: string) => {
  const res = await httpRequest.get(`/users/${id}`);
  return res.data;
};
export const givePoint = async (data: any) => {
  const res = await httpRequest.post("/users/givePoint", data);
  return res.data;
};
export const minusPoint = async (data: any) => {
  const res = await httpRequest.post("/users/minusPoint", data);
  return res.data;
};
