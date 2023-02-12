import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';

const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  { path: 'to-do', component: ToDoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
