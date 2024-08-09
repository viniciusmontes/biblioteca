import { AxiosRequestConfig } from "axios";
import { BookDTO } from "../models/book";
import { requestBackend } from "../utils/requests";

export function insertRequest(obj: BookDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/books",
    withCredentials: true,
    data: obj,
  };

  return requestBackend(config);
}

export function findAll() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/books",
    withCredentials: true,
  };
  return requestBackend(config);
}

export function deleteById(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/books/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}

