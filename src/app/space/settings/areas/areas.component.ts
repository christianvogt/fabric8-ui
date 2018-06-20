import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Area } from 'ngx-fabric8-wit';

import { Action, ActionConfig } from 'patternfly-ng/action';
import { EmptyStateConfig } from 'patternfly-ng/empty-state';
import { FilterEvent } from 'patternfly-ng/filter';
import { TreeListConfig } from 'patternfly-ng/list';
import { SortEvent } from 'patternfly-ng/sort';

import { AreasCStore } from './areas.cstore';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'alm-areas',
  templateUrl: 'areas.component.html',
  styleUrls: ['./areas.component.less']
})
export class AreasComponent {

  @ViewChild(ModalDirective) modal: ModalDirective;

  showCreateAreaDialog: boolean = false;

  actionConfig: ActionConfig = {
    moreActions: [{
      id: 'addChildArea',
      title: 'Add Child Area',
      tooltip: 'Add Child Area'
    }]
  } as ActionConfig;

  emptyStateConfig: EmptyStateConfig = {
    actions: {
      primaryActions: [{
        id: 'addArea',
        title: 'Add Area',
        tooltip: 'Add Area'
      }],
      moreActions: []
    } as ActionConfig,
    title: 'Add Area',
    info: 'Start by adding an area.'
  } as EmptyStateConfig;

  treeListConfig: TreeListConfig = {
    dblClick: false,
    emptyStateConfig: this.emptyStateConfig,
    multiSelect: false,
    selectItems: false,
    showCheckbox: false,
    treeOptions: {
      allowDrag: false,
      isExpandedField: 'expanded'
    }
  } as TreeListConfig;

  defaultArea: string;
  selectedAreaId: string;

  constructor(public store: AreasCStore) {}

  openModal(): void {
    this.modal.show();
  }

  closeModal(): void {
    this.modal.hide();
  }

  onDialogShow(): void {
    this.showCreateAreaDialog = true;
  }

  onDialogHide(): void {
    // since we don't have #onHidden, delay the unmounting of the dialog content
    setTimeout(() => {
      this.showCreateAreaDialog = false;
    }, 300);
  }

  addChildArea(id: string): void {
    this.selectedAreaId = this.defaultArea;
    if (id) {
      this.selectedAreaId = id;
    }
    this.openModal();
  }

  addArea(area: Area): void {
    // this.allAreas.push(area);

    // // Reapply sort and filter, if any
    // this.allAreas.sort((area1: Area, area2: Area) => this.compare(area1, area2));
    // this.applyFilters(this.appliedFilters);
  }

  filterChange($event: FilterEvent): void {
    this.store.setFilter($event.appliedFilters);
  }

  sortChange($event: SortEvent): void {
    this.store.setSort($event.field.id, $event.isAscending);
  }

  // Actions

  handleAction($event: Action, area: Area): void {
    if ($event.id === 'addChildArea') {
      this.addChildArea(area.id);
    } else if ($event.id === 'addArea') {
      this.addChildArea(this.defaultArea);
    }
  }
}
