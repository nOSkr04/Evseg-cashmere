import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const transactions = async ({
  page,
  limit,
  tab,
}: {
  page: number;
  limit: number;
  tab: string;
}) => {
  if (tab !== "All") {
    const res = await httpRequest.get("/pointTransactions", {
      page: page,
      limit: limit,
      sort: "-createdAt",
      isMinus: tab === "Minus" ? true : false,
    });
    return res;
  }
  const res = await httpRequest.get("/pointTransactions", {
    page: page,
    limit: limit,
    sort: "-createdAt",
  });
  return res;
};
export const minusTransactions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await httpRequest.get("/pointTransactions", {
    page: page,
    limit: limit,
    sort: "-createdAt",
    isMinus: true,
  });
  return res;
};
export const sumTransactions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await httpRequest.get("/pointTransactions", {
    page: page,
    limit: limit,
    sort: "-createdAt",
    isMinus: false,
  });
  return res;
};
