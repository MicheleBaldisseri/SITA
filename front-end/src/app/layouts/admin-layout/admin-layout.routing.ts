import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DynamicCrudComponent } from 'app/dynamic-crud/dynamic-crud/dynamic-crud.component';
import { LandingPageComponent } from 'app/landing-page/landing-page.component';
import { LandingPage2Component } from 'app/landing-page2/landing-page2.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'kpi',            component: DynamicCrudComponent },
    { path: 'landing',        component: LandingPageComponent },
    { path: 'landing2',        component: LandingPage2Component },
    { path: 'upgrade',        component: UpgradeComponent },
];
