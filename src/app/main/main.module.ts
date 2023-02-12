import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ToDoComponent } from './to-do/to-do.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListComponent } from './list/list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddModalComponent } from './add-modal/add-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@NgModule({
  declarations: [
    ToDoComponent,
    ListComponent,
    AddModalComponent,
    SortByDatePipe,
    ChangePasswordModalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzFormModule,
    NzDatePickerModule,
    NzCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NzPopoverModule,
  ],
})
export class MainModule {}
