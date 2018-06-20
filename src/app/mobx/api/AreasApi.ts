import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Area, WIT_API_URL } from 'ngx-fabric8-wit';
import { AbstractApi } from './AbstractApi';

@Injectable()
export class AreasApi extends AbstractApi {
  constructor(http: Http, @Inject(WIT_API_URL) apiUrl: string) {
    super(http, apiUrl + 'areas');
  }

  async getUsers(): Promise<Area[]> {
    return this.get<Area[]>();
  }

  async getArea(id: string): Promise<Area> {
    return this.get<Area>(id);
  }

  async createArea(area: Area): Promise<void> {
    this.post(area.id, { body: area } as RequestOptionsArgs);
  }
}
