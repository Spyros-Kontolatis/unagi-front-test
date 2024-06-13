import { HTTP } from './HTTP';

export default class Service {
  static cards() {
    const baseURL = '/cards';

    return {
      index: () => {
        const path = baseURL;
        return HTTP.make(path, 'get');
      },
    };
  }
}
