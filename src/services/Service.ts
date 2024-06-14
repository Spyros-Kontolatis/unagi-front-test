import { HTTP } from './HTTP';

export default class Service {
  static cards() {
    const baseURL = '/cards';

    return {
      index: () => {
        const path = baseURL;
        return HTTP.make(path, 'get');
      },
      create: () => {
        const path = baseURL;
        return HTTP.make(path, 'post');
      },
      get: (playerId: number) => {
        const path = `${baseURL}/${playerId}`;
        return HTTP.make(path, 'get');
      },
      update: (playerId: number) => {
        const path = `${baseURL}/${playerId}`;
        return HTTP.make(path, 'put');
      },
      delete: (playerId: number) => {
        const path = `${baseURL}/${playerId}`;
        return HTTP.make(path, 'delete');
      },
    };
  }
}
