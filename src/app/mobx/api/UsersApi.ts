import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { AUTH_API_URL, User } from 'ngx-login-client';
import { AbstractApi } from './AbstractApi';

@Injectable()
export class UsersApi extends AbstractApi {
  constructor(http: Http, @Inject(AUTH_API_URL) apiUrl: string) {
    super(http, apiUrl);
  }

  async getUsers(): Promise<User[]> {
    return this.get<User[]>();
  }

  async getUser(id: string): Promise<User> {
    return this.get<User>(id);
  }

  async createUser(user: User): Promise<void> {
    this.post(user.id, { body: user } as RequestOptionsArgs);
  }

  async updateUser(user: User): Promise<void> {
    this.patch(user.id, { body: user } as RequestOptionsArgs);
  }
}
