import { observable } from 'mobx';
import { Area, Space } from 'ngx-fabric8-wit';
import { User } from 'ngx-login-client';

// Sample app state with some entity info.
export type AppState = {
  users?: {
    [id: string]: User;
  };
  areas?: {
    [id: string]: Area;
  };
  spaces?: {
    [id: string]: Space;
  };
  spaceAreas?: {
    [id: string]: string[];
  }
};
