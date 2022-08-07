import { Injectable } from '@angular/core';
import { Project } from './project';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  projectsRef: AngularFireList<any>;
  projectRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {
  }

  // Create Project
  AddProject(project: Project) {
    const newArr = new Array(project.ownerEmail);
    this.projectsRef.push({
      projectName: project.projectName,
      projectSummery: project.projectSummery,
      createDate: project.createDate,
      lastUpdateDate: project.lastUpdateDate,
      ownerEmail: project.ownerEmail,
      permissions: newArr,
    });

  }
  // Fetch Single Project Object
  GetProject(id: string) {
    this.projectRef = this.db.object('projects-list/' + id);
    return this.projectRef;
  }
  // Fetch Students List
  GetProjectsList() {
    this.projectsRef = this.db.list('projects-list');
    return this.projectsRef;
  }
  // Update
  UpdateProject(project: Project) {
    this.projectRef.update({
      projectName: project.projectName,
      projectSummery: project.projectSummery,
      createDate: project.createDate,
      lastUpdateDate: project.lastUpdateDate,
      ownerEmail: project.ownerEmail,
    });
  }
  // Delete Project Object
  DeleteProject(id: string) {
    this.projectRef = this.db.object('projects-list/' + id);
    this.projectRef.remove();
  }

  ShareProject(id: string, currentPermissions: any ,  emailToAdd: string) {
    const arr = Object.values(currentPermissions);
    arr.push(emailToAdd);

     this.projectRef = this.db.object('projects-list/' + id);
     this.projectRef.update({
       permissions: arr,
     });
  }
}

