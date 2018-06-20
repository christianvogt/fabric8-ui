import { Injectable } from '@angular/core';
import { action, computed, IReactionOptions, observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import { Area } from 'ngx-fabric8-wit';
import { Filter } from 'patternfly-ng';
import { Store } from '../../../mobx/store';
import { AreasStore } from '../../../mobx/stores/areas.store';
import { ContextStore } from '../../../mobx/stores/context.store';

// internal types for simplicity
type AreasById = { [id: string]: Area };
type TreeNodesById = { [id: string]: TreeNode };

// This is the Component Store for areas. Its purpose is to capture the interactions and state of the areas view.
// All state is either stored locally because it serves no purpose to other components, or computed from global state.
@Injectable()
export class AreasCStore {
  // This is a cache of tree nodes to ensure that we can retrieve a previous instance of TreeNode
  // from within a @computed value. That way we do not lose state saved at the TreeNode level such as expanded.
  treeNodeCache: TreeNodesById = {};

  constructor(private store: Store,
    private areasStore: AreasStore,
    private contextStore: ContextStore
  ) {}

  @observable
  loading: boolean = false;

  @observable
  filterField: string = 'area';

  @observable
  filters: Filter[] = [];

  @observable
  sortField: string = 'name';

  @observable
  sortAscending: boolean = true;

  // expanded state should not
  @observable
  expandedNodes: { [id: string]: boolean } = {};

  get showAreas() {
    return !this.loading || this.areas.length > 0;
  }

  get spaceId(): string {
    return this.contextStore.context.space.id;
  }

  get resultsCount(): number {
    return this.filteredTreeNodes.length;
  }

  /**
   * All areas within the space.
   */
  @computed
  private get areas(): Area[] {
    return this.store.state.spaceAreas && this.spaceId && this.store.state.areas ?
      this.store.state.spaceAreas[this.spaceId].map(areaId => this.store.state.areas[areaId]).filter(x => x) : [];
  }

  /**
   * Map of ID to Area for each area within the space.
   */
  @computed
  get areasById(): AreasById {
    return this.areas.reduce((acc: AreasById, area: Area) => {
      acc[area.id] = area;
      return acc;
    }, {});
  }

  /**
   * TreeNode for each area within the space.
   */
  @computed
  private get treeNodes(): TreeNode[] {
    const treeNodeCache: TreeNodesById = this.treeNodeCache;
    // reset the cache
    this.treeNodeCache = {};
    return this.areas.map((area: Area) => {
      let treeNode: TreeNode = this.treeNodeCache[area.id];
      if (!treeNode) {
        treeNode = new TreeNode(this, area);
      }
      // re-create the cache
      this.treeNodeCache[area.id] = treeNode;
      return treeNode;
    });
  }

  /**
   * Map of ID to TreeNode.
   */
  @computed
  get treeNodesById(): TreeNodesById {
    return this.treeNodes.reduce((acc: TreeNodesById, node: TreeNode) => {
      acc[node.area.id] = node;
      return acc;
    }, {});
  }

  /**
   * Filtered list of tree nodes.
   */
  @computed
  private get filteredTreeNodes(): TreeNode[] {
    return this.treeNodes.filter((node: TreeNode) => {
      if (this.matchesFilter(node)) {
        return node;
      }
      return null;
    }).filter(x => x);
  }

  /**
   * Sorted and filtered list of tree nodes.
   */
  @computed
  get sortedFilteredNodes(): TreeNode[] {
    return this.filteredTreeNodes.slice().sort(this.compare);
  }

  /**
   * Root nodes to display in the tree.
   */
  @computed
  get rootTreeNodes(): TreeNode[] {
    return this.sortedFilteredNodes.filter((node: TreeNode) => node.parent == null);
  }

  // actions

  // Whenever `this.spaceId` changes, we want to reload the spaces
  // because we don't currently have active server subscriptions to push data to the client.
  // Ideally, this kind of thing could be done more generically as well.
  loadReaction = {
    expression: () => this.spaceId,
    effect: () => this.load()
  } as IReactionOptions;

  @asyncAction
  * load() {
    this.loading = true;
    yield this.areasStore.loadSpaceAreas(this.spaceId);
    this.loading = false;
  }

  @action
  setFilter(filters: Filter[]) {
    this.filters = filters || [];
  }

  @action
  setSort(field: string, ascending: boolean) {
    this.sortField = field;
    this.sortAscending = ascending;
  }

  // utilities

  private compare = (a: TreeNode, b: TreeNode): number => {
    return a.area.attributes.name.localeCompare(b.area.attributes.name) * (this.sortAscending ? 1 : -1);
  }

  matchesFilter(node: TreeNode): boolean {
    return this.filters.length === 0 || !this.filters.some((filter: Filter) => filter.field.id === 'area' && !node.area.attributes.name.match(filter.value));
  }
}

// The tree node is given to the template tree list.
export class TreeNode {

  // TODO how to capture the expanded state from the tree and store it here?
  @observable
  expanded: boolean = false;

  constructor(private store: AreasCStore, public area: Area) {}

  // simplify template by providing label property
  get label(): string {
    return this.area.attributes.name;
  }

  @computed
  get children(): TreeNode[] {
    // use only the sorted and filtered nodes to determine the set of children
    return this.store.sortedFilteredNodes.filter((node: TreeNode) => node.parent === this);
  }

  @computed
  get parent(): TreeNode {
    return this.getParentArea(this.area);
  }

  private getParentArea(area: Area) {
    if (area && area.relationships.parent) {
      const node: TreeNode = this.store.treeNodesById[area.relationships.parent.data.id];
      if (node && this.store.matchesFilter(node)) {
        return node;
      }
      return this.getParentArea(this.store.areasById[area.relationships.parent.data.id]);
    }
    return null;
  }
}
