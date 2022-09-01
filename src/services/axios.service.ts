import axios, { AxiosError } from "axios";
import { TODO } from "../types";

interface LoginParams {
  email: string;
  password: string;
}

interface ServerError {
  message: string;
}

const authAxios = axios.create({
  baseURL: "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/auth",
});

const todoAxios = axios.create({
  baseURL: "https://n38lcff1wk.execute-api.ap-northeast-2.amazonaws.com/todos",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const getToken = async (loginParams: LoginParams) => {
  try {
    const response = await authAxios.post("/signin", { ...loginParams });
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant get token" };
  }
};
export const postUser = async (loginParams: LoginParams) => {
  try {
    await authAxios.post("/signup", { ...loginParams });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant get token" };
  }
};

export const getTodos = async () => {
  try {
    const response = await todoAxios.get(``);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant get todolist" };
  }
};

export const createTodo = async (todoParams: string) => {
  try {
    const response = await todoAxios.post("", { todo: todoParams });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant post todo" };
  }
};

export const updateTodo = async (
  todoParams: Pick<TODO, "id" | "todo" | "isCompleted">
) => {
  try {
    const response = await todoAxios.put(`/${todoParams.id}`, {
      todo: todoParams.todo,
      isComplted: todoParams.isCompleted,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant put todo" };
  }
};

export const deleteTodo = async (todoParams: TODO["id"]) => {
  try {
    await todoAxios.delete(`/ ${todoParams}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      return serverError.message;
    }
    return { errorMessage: "cant delete todo" };
  }
};
