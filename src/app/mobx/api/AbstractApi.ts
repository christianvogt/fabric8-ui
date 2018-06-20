import { Headers, Http, RequestOptionsArgs } from '@angular/http';

export abstract class AbstractApi {

  protected defaultHeaders = new Headers({ 'Content-Type': 'application/json' });

  constructor(protected http: Http, protected baseUrl: string) {}

  private prepareOptions(options): RequestOptionsArgs  {
    return {
      headers: this.defaultHeaders,
      ...options
    } as RequestOptionsArgs;
  }

  private url(segments: string | number | Array<string | number>): string {
    let parts: Array<string | number> = [this.baseUrl];
    if (Array.isArray(segments)) {
      parts = parts.concat(segments);
    } else {
      parts.push(segments);
    }
    return parts.join('/');
  }

  async get<T>(segments: string | number | Array<string | number> = null, options: RequestOptionsArgs  = null): Promise<T> {
    return this.http.get(this.url(segments), this.prepareOptions(options)).map((response) => response.json().data).toPromise();
  }

  async post<T>(segments: string | number | Array<string | number>, options: RequestOptionsArgs = null): Promise<T> {
    return this.http.post(this.url(segments), this.prepareOptions(options)).map((response) => response.json()).toPromise();
  }

  async delete<T>(segments: string | number | Array<string | number>, options: RequestOptionsArgs  = null): Promise<T> {
    return this.http.delete(this.url(segments), this.prepareOptions(options)).map((response) => response.json()).toPromise();
  }

  async patch<T>(segments: string | number | Array<string | number>, options: RequestOptionsArgs  = null): Promise<T> {
    return this.http.patch(this.url(segments), this.prepareOptions(options)).map((response) => response.json()).toPromise();
  }
}
