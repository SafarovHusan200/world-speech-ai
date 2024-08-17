import axios from "axios";

export async function getData(url, token) {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postData(data) {
  try {
    const response = await axios.post(data.url, data.body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
    });
    console.log("res", response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function putData(url, token, body) {
  try {
    const response = await axios.put(url, body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function patchData(url, token, body) {
  try {
    const response = await axios.patch(url, body, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteData(url, token) {
  try {
    const response = await axios.delete(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
