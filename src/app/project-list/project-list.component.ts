import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { UserEmailService } from '../shared/data.service';
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
  ProjectsForCurrentUser: Project[];
  hideWhenNoProject: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  counter: number = 1;
  emailOfSomeoneToInvite: string;
  userEmail: string | undefined;


  // constructor(public crudApi: CrudService, public toastr: ToastrService,  private data: UserEmailService) {}
  constructor(public crudApi: CrudService, public toastr: ToastrService, private dataFromService: UserEmailService) {}

  ngOnInit() {
    this.userEmail = this.dataFromService.getUserEmail();
    this.dataState();
    let s = this.crudApi.GetProjectsList();
    s.snapshotChanges().subscribe((data) => {
      this.Project = [];
      this.ProjectsForCurrentUser= [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Project.push(a as Project);
       if( (a['permissions'][0] && a['permissions'][0]   == this.userEmail) || (a['permissions'][1] && a['permissions'][1]  == this.userEmail)  ||  a['permissions'][2]  && (a['permissions'][2] == this.userEmail) ||
        ( a['permissions'][3] && a['permissions'][3] == this.userEmail) || (a['permissions'][4] && a['permissions'][4]  == this.userEmail) || (a['permissions'][5] && a['permissions'][5] == this.userEmail) ||
        (a['permissions'][6] && a['permissions'][6] == this.userEmail) || (a['permissions'][7] && a['permissions'][7] == this.userEmail) ||  (a['permissions'][8] && a['permissions'][8] == this.userEmail) ) { 
              this.ProjectsForCurrentUser.push(a as Project); 
        }        

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