import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AreasStore } from './stores/areas.store';
import { ContextStore } from './stores/context.store';

import { AreasApi } from './api/AreasApi';
import { SpacesApi } from './api/SpacesApi';
import { UsersApi } from './api/UsersApi';
import { Store } from './store';

import { AutorunDirective } from './directives/autorun.directive';
import { ObserverDirective } from './directives/observer.directive';
import { ReactionDirective } from './directives/reaction.directive';

@NgModule({
  imports: [CommonModule, HttpModule ],
  exports: [AutorunDirective, ObserverDirective, ReactionDirective],
  declarations: [AutorunDirective, ObserverDirective, ReactionDirective],
  providers: [
    AreasStore,
    ContextStore,
    Store,
    AreasApi,
    SpacesApi,
    UsersApi
  ]
})
export class PlatformModule {
}
