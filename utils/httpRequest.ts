import axios from "axios";

export const httpsGet = async (url: string) => {
  const res = await axios({
    method: "get",
    url: url,
    responseType: "json",
  });
  return await res.data;
};

export const httpsPost = async (url: string, data: object) => {
  const res = await axios({
    method: "post",
    url: url,
    responseType: "json",
    data: data,
  });
  return await res.data;
};
