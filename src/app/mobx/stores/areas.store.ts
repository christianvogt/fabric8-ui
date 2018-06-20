import { Injectable } from '@angular/core';
import { asyncAction } from 'mobx-utils';
import { Area } from 'ngx-fabric8-wit';
import { AreasApi } from '../api/AreasApi';
import { SpacesApi } from '../api/SpacesApi';
import { Store } from '../store';

@Injectable()
export class AreasStore {

  constructor(private store: Store, private areasApi: AreasApi, private spacesApi: SpacesApi) {}

  getArea(id: string) {
    return this.store.state.areas ? this.store.state.areas[id] : null;
  }

  @asyncAction
  * loadSpaceAreas(spaceId: string) {
    const areas: Area[] = yield this.spacesApi.getSpaceAreas(spaceId);
    const areaIds: string[] = [];
    areas.forEach((area: Area) => {
      if (!this.store.state.areas) {
        this.store.state.areas = {};
      }
      // might be more efficient for rendering to deep merge instead of replace
      this.store.state.areas[area.id] = area;
      areaIds.push(area.id);
    });
    if (!this.store.state.spaceAreas) {
      this.store.state.spaceAreas = {};
    }
    this.store.state.spaceAreas[spaceId] = areaIds;
  }
}
