import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-project', pathMatch: 'full' },
  { path: 'register-project', component: AddProjectComponent },
  { path: 'view-projects', component: ProjectListComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}