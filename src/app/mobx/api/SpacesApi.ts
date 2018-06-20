import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Area, Space, WIT_API_URL } from 'ngx-fabric8-wit';
import { AbstractApi } from './AbstractApi';

@Injectable()
export class SpacesApi extends AbstractApi {
  constructor(protected http: Http, @Inject(WIT_API_URL) apiUrl: string) {
    super(http, apiUrl + 'spaces');
  }

  async getSpaces(): Promise<Space[]> {
    return this.get<Space[]>();
  }

  async getSpace(id: string): Promise<Space> {
    return this.get<Space>(id);
  }

  async createSpace(space: Space): Promise<void> {
    this.post(space.id, { body: space } as RequestOptionsArgs);
  }

  async updateSpace(space: Space): Promise<void> {
    this.patch(space.id, { body: space } as RequestOptionsArgs);
  }

  async getSpaceAreas(id: string): Promise<Area[]> {
    return this.get<Area[]>([id, 'areas']);
  }
}
