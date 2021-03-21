import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ConnectionOptions } from "./connection/ConnectionOptions";
export type Pagination = {
  page?: number;
  per_page?: number;
};

// type Config = {
//   API_KEY_VARIABLE?: string;
//   API_SECRET_VARIABLE?: string;
// };

export abstract class Base {

  private readonly basePath: string = "https://api.tayeh.ir/";
  private readonly authPath: string = "https://auth.tayeh.ir/";
  // private readonly mediaPath: string = "https://media.tayeh.ir/";
  private API_ACCESS: string;

  constructor(
    options: ConnectionOptions
    ) {
    this.API_ACCESS = options.api_access;
    if (typeof this.API_ACCESS !== "string")
      throw new Error("UNAUTHORIZED REQUEST.");
  }

  protected objectToQuery (queries) {
    var queryString = Object.keys(queries).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(queries[key])
    }).join('&');
    return queryString
  }

  protected AUTH_HEADER(headers = {}, config: AxiosRequestConfig= {}, setBearer=true) {
    if (setBearer) {
      return {
        headers: {
        ...headers,
        Authorization: `Bearer ${this.API_ACCESS}`,
      }, ...config}
    } else {
      return {
        headers: {
        ...headers,
      }, ...config}
    }
    
  }

  protected async delete<T>(
    endpoint: string,
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.basePath + endpoint;
    return Axios.delete(
      url,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

  protected async get<T>(
    endpoint: string,
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.basePath + endpoint;
    return Axios.get(
      url,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

  protected async post<T>(
    endpoint: string,
    body: any = {},
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.basePath + endpoint;
    return Axios.post(
      url, body,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

  protected async put<T>(
    endpoint: string,
    body: any = {},
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.basePath + endpoint;
    return Axios.put(
      url, body,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

  protected async get_auth<T>(
    endpoint: string,
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.authPath + endpoint;
    return Axios.get(
      url,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

  protected async post_auth<T>(
    endpoint: string,
    body: any = {},
    headers?: any,
    options?: AxiosRequestConfig,
    setBearer: boolean = true
  ): Promise<AxiosResponse<T>> {
    const url = this.authPath + endpoint;
    return Axios.post(
      url, body,
      this.AUTH_HEADER(headers, options, setBearer)
    )
  }

}
