import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog'; 
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { DynamicCrudComponent } from 'app/dynamic-crud/dynamic-crud/dynamic-crud.component';
import { SaveDialogComponent } from 'app/dynamic-crud/components/save-dialog/save-dialog.component';
import { SaveTresholdDialogComponent } from 'app/dynamic-crud/components/save-treshold-dialog/save-treshold-dialog.component';
import { DeleteDialogComponent } from 'app/dynamic-crud/components/delete-dialog/delete-dialog.component';
import { FilterDialogComponent } from 'app/dynamic-crud/components/filter-dialog/filter-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    MatBadgeModule,
    DragDropModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    DynamicCrudComponent,
    SaveDialogComponent,
    SaveTresholdDialogComponent,
    DeleteDialogComponent,
    FilterDialogComponent
  ],
  entryComponents: [SaveDialogComponent, SaveTresholdDialogComponent]
})

export class AdminLayoutModule {}
