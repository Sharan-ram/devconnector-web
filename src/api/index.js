import axios from "axios";

const api = async (options) => {
  const jwt = localStorage.getItem("jwt");
  const {
    loadingAction,
    dataAction,
    method = "GET",
    url,
    payload,
    access = "private",
    stateSlice,
    dispatch,
  } = options;
  dispatch(loadingAction());

  let config = {};

  let headers = {};
  if (access === "private") {
    headers["x-auth-token"] = jwt;
  }

  if (method === "PUT" || method === "POST") {
    headers["Content-Type"] = "application/json";
    config.data = payload;
  }

  if (Object.keys(headers).length) {
    config.headers = headers;
  }

  try {
    const res = await axios({
      ...config,
      method,
      url,
    });
    dispatch(dataAction({ [stateSlice]: res.data }));

    if (stateSlice === "jwt") {
      localStorage.setItem("jwt", res.data.jwt);
    }
  } catch (err) {
    console.error(err);
    const {
      response: { data, status },
    } = err;
    let payload = {};
    if (typeof data === "string") {
      payload = {
        msg: data,
        status,
      };
    } else {
      payload = {
        ...data.errors[0],
        status,
      };
    }
    dispatch(dataAction({ error: true, errorData: payload }));
  }
};

export default api;
