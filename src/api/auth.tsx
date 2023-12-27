import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const login = async () => {
  const res = await httpRequest.post("/user/login");
  return res;
};
