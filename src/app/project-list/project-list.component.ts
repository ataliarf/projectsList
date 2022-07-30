import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Project } from './../shared/project';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})

export class ProjectListComponent implements OnInit {
  p: number = 1;
  Project: Project[];
  hideWhenNoProject: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  counter: number = 1;
  emailOfSomeoneToInvite: string;

  constructor(public crudApi: CrudService, public toastr: ToastrService) {}

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetProjectsList();
    s.snapshotChanges().subscribe((data) => {
      this.Project = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Project.push(a as Project);
      });
    });
  }

  dataState() {
    this.crudApi
      .GetProjectsList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoProject = false;
          this.noData = true;
        } else {
          this.hideWhenNoProject = true;
          this.noData = false;
        }
      });
  }

  deleteProject(project: Project) {
    if (window.confirm('Are sure you want to delete this project ?')) {
      this.crudApi.DeleteProject(project.$key);
      this.toastr.success(project.projectName + ' successfully deleted!');
    }
  }


  shareProject(project: Project) {
      this.crudApi.ShareProject((project.$key), project.permissions, this.emailOfSomeoneToInvite, this.counter);
      this.counter++;
      this.toastr.success(project.projectName + ' successfully shares!');
  }
}