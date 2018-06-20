import { Directive, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { IReactionDisposer, IReactionOptions, IReactionPublic, reaction } from 'mobx';

import { MobxDirective } from './mobx.directive';

@Directive({ selector: '[reaction]' })
export class ReactionDirective extends MobxDirective {

  @Input() reaction: {
    expression: (r: IReactionPublic) => any;
    effect: (args: any) => {};
    options?: IReactionOptions;
  };

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {
      super(templateRef, viewContainer, renderer);
  }

  register(view): IReactionDisposer {
    return reaction(
      this.reaction.expression,
      this.reaction.effect,
      {
        name: `[Reaction]: ${view._view.component.constructor.name}`,
        fireImmediately: true,
        ...this.reaction.options
      }
    );
  }
}
