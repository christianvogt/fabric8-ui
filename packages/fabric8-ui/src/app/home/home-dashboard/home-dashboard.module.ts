import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Fabric8WitModule } from 'ngx-fabric8-wit';
import { FeatureFlagModule } from 'ngx-feature-flag';
import { LoadingWidgetModule } from '../../dashboard-widgets/loading-widget/loading-widget.module';
import { RecentPipelinesWidgetModule } from '../../dashboard-widgets/recent-pipelines-widget/recent-pipelines-widget.module';
import { RecentWorkspacesWidgetModule } from '../../dashboard-widgets/recent-workspaces-widget/recent-workspaces-widget.module';
import { EmptyStateModule } from '.././empty-state/empty-state.module';
import { HomeRoutingModule } from '../home-routing.module';
import { HomeDashboardComponent } from './home-dashboard.component';
import { RecentSpacesWidgetModule } from '../recent-spaces-widget/recent-spaces-widget.module';
import { WorkItemWidgetModule } from '../work-item-widget/work-item-widget.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoadingWidgetModule,
    Fabric8WitModule,
    FeatureFlagModule,
    EmptyStateModule,
    WorkItemWidgetModule,
    RecentPipelinesWidgetModule,
    RecentSpacesWidgetModule,
    RecentWorkspacesWidgetModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [HomeDashboardComponent],
  declarations: [HomeDashboardComponent],
})
export class HomeDashboardModule {
  constructor() {}
}
