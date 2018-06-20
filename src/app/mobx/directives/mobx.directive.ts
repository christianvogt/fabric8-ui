import { OnDestroy, OnInit, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { IReactionDisposer } from 'mobx';

export abstract class MobxDirective implements OnInit, OnDestroy {
  private dispose: IReactionDisposer;
  protected view: any;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {
  }

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) {
      this.dispose();
    }

    this.dispose = this.register(this.view);
  }

  ngOnDestroy() {
    if (this.dispose) {
      this.dispose();
    }
  }

  abstract register(view): IReactionDisposer;
}
