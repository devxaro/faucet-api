import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import https from 'https'; // to handle TLS certificates
import qs from 'qs';
import {TechnicalErrors} from '../../core/errors';

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private config: AxiosRequestConfig = {
    headers: {},
    paramsSerializer: (params: any) => {
      return qs.stringify(params, {arrayFormat: 'repeat'});
    },
    withCredentials: true
  };

  constructor(private readonly baseUrl: string) {
    this.axiosInstance = axios.create(this.config);
  }

  setHeader(key: string, value: string) {
    this.config.headers = {
      ...this.config.headers,
      [key]: value
    };
    this.updateAxiosInstance();
  }

  getRequestPath(url: string) {
    return this.baseUrl ? `${this.baseUrl}${url}` : url;
  }

  setTlsAuth(cert: any, key: any, ca?: any) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert,
      key,
      ca
    });

    this.config = {
      ...this.config,
      httpsAgent
    };
    this.updateAxiosInstance();
  }

  clearTlsAuth() {
    delete this.config.httpsAgent;
    this.updateAxiosInstance();
  }

  private updateAxiosInstance() {
    this.axiosInstance = axios.create(this.config);
  }

  async request(url: string, params = {}, method = 'GET', data = null) {
    try {
      const config = {
        ...this.config,
        method,
        url: this.getRequestPath(url),
        params
      };

      if (method.toUpperCase() !== 'GET' && data) {
        config.data = data;
      }

      const response = await this.axiosInstance(config);

      return response?.data;
    } catch (err: any) {
      throw new TechnicalErrors.ExternalAPIError(err.message);
    }
  }
}
