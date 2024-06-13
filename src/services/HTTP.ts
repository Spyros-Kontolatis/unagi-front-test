import axios from 'axios';
import type { AxiosHeaders, AxiosRequestConfig } from 'axios';
const hrefToUrl = (href: string): URL => new URL(href, 'http://localhost:8001');

export class HTTP<T extends object> {
  #activeVisit = null;

  #method: 'get' | 'post' | 'put' | 'delete' = 'get';

  #url: URL = null;

  #data: T = null;

  #headers: AxiosHeaders = null;

  #config: AxiosRequestConfig = {};

  #methods = {
    onBefore: null,
    onStart: null,
    onSuccess: null,
    onNoData: null,
    onFinish: null,
    onError: null,
    onClientError: null,
    onErrorNotFound: null,
    onErrorNotAvailable: null,
    onErrorConflict: null,
  };

  /**
   * @param {string} url
   * @param {"post"|"put"|"delete"|"get"} method
   */
  static make(url: string, method: 'post' | 'put' | 'delete' | 'get') {
    return new HTTP(url, method);
  }

  static throwError(visit, cb, error) {
    if (visit[cb]) {
      visit[cb](error);
      return;
    }
    visit.onError?.(error);
  }

  /**
   * @param {string} url
   * @param {"post"|"put"|"delete"|"get"} method
   */
  constructor(url: string, method: 'post' | 'put' | 'delete' | 'get' = 'get') {
    this.#url = hrefToUrl(url);
    this.#method = method;
  }

  /**
   * @param {Function} cb
   */
  onBefore(cb: Function) {
    this.#methods.onBefore = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onStart(cb: Function) {
    this.#methods.onStart = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onSuccess(cb: Function) {
    this.#methods.onSuccess = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onNoData(cb: Function) {
    this.#methods.onNoData = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onFinish(cb: Function) {
    this.#methods.onFinish = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onError(cb: Function) {
    this.#methods.onError = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onClientError(cb: Function) {
    this.#methods.onClientError = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onErrorConflict(cb: Function) {
    this.#methods.onErrorConflict = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onErrorNotAvailable(cb: Function) {
    this.#methods.onErrorNotAvailable = cb;
    return this;
  }

  /**
   * @param {Function} cb
   */
  onErrorNotFound(cb: Function) {
    this.#methods.onErrorNotFound = cb;
    return this;
  }

  /**
   * @param {T} data
   */
  data(data: T) {
    this.#data = data;
    return this;
  }

  /**
   * @param {AxiosHeaders} headers
   */
  headers(headers: AxiosHeaders) {
    this.#headers = headers;
    return this;
  }

  /**
   * @param {AxiosRequestConfig} config
   */
  config(config: AxiosRequestConfig) {
    this.#config = config;
    return this;
  }

  execute() {
    return this.apiCall();
  }

  async apiCall() {
    const method = this.#method;

    this.#url = new URL(`${this.#url.origin}${this.#url.pathname}`);

    const visit = {
      url: this.#url,
      method,
      data: this.#data,
      headers: this.#headers,
      ...this.#methods,
    };

    if (visit.onBefore?.(visit) === false) return;

    this.#activeVisit = visit;
    visit.onStart?.(visit);

    try {
      const response = await axios({
        method,
        url: visit.url.href,
        baseURL: visit.url.origin,
        data: method === 'get' ? {} : visit.data,
        params: method === 'get' ? visit.data : {},
        headers: {
          ...this.#headers,
          Accept: 'application/json',
        },
        ...this.#config,
      });

      if (!response) {
        throw new Error('No response');
      }

      if (visit.onNoData && response.status === 204) {
        visit.onNoData?.(visit);
        return;
      }

      visit.onSuccess?.(response.data);
      return;
    } catch (error) {
      if (axios.isCancel(error)) return;

      if (!error.response) {
        visit.onError?.(error);
        return;
      }

      const { status } = error.response;

      if (status === 400) {
        HTTP.throwError(visit, 'onClientError', error);
        return;
      }

      if (status === 409) {
        HTTP.throwError(visit, 'onErrorConflict', error);
        return;
      }

      if (status === 410) {
        HTTP.throwError(visit, 'onErrorNotAvailable', error);
        return;
      }

      if (status === 404) {
        HTTP.throwError(visit, 'onErrorNotFound', error);
        return;
      }

      visit.onError?.(error);
    } finally {
      visit.onFinish?.(visit);
    }
  }
}
