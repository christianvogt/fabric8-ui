import { Directive, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { autorun, IReactionDisposer } from 'mobx';

import { MobxDirective } from './mobx.directive';

@Directive({ selector: '[observer]' })
export class ObserverDirective extends MobxDirective {

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {
      super(templateRef, viewContainer, renderer);
  }

  register(view): IReactionDisposer {
    return autorun(
      () => view.detectChanges(),
      { name: `[Observer]: ${view._view.component.constructor.name}` }
    );
  }
}
