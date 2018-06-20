import { Directive, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { autorun, IReactionDisposer } from 'mobx';

import { MobxDirective } from './mobx.directive';

@Directive({ selector: '[autorun]' })
export class AutorunDirective extends MobxDirective {

  @Input() autorun;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {
      super(templateRef, viewContainer, renderer);
  }

  register(view): IReactionDisposer {
    return autorun(
      this.autorun,
      { name: `[Autorun]: ${view._view.component.constructor.name}` }
    );
  }
}
