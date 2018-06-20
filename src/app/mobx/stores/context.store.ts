import { Injectable } from '@angular/core';
import { computed } from 'mobx';
import { fromStream } from 'mobx-utils';
import { Context } from 'ngx-fabric8-wit';
import { ContextService } from '../../shared/context.service';

@Injectable()
export class ContextStore {
  constructor(private contextService: ContextService) {}

  // convert the existing ContextService context into a mobx observable
  private _context = fromStream(this.contextService.current);

  get context(): Context {
    return this._context.current as Context;
  }
}
