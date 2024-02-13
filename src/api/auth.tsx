import { ILoginForm } from "../components/auth/login-form";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const login = async (data: ILoginForm) => {
  const res = await httpRequest.post("/users/login", data);
  return res;
};
export const signUp = async (data: {
  phone: string;
  firstName: string;
  lastName: string;
  userType: string;
  password: string;
  nationalId?: string;
  bankName?: string;
  bankNumber?: string;
}) => {
  const res = await httpRequest.post("/users/register", data);
  return res;
};

export const logout = async () => {
  const res = await httpRequest.get("/users/logout");
  return res;
};
