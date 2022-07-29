import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})

export class AddProjectComponent implements OnInit {
  public projectForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.crudApi.GetProjectsList();
    this.myProjectForm();
  }

  myProjectForm() {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(2)]],
      ownerEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
    });
  }

  get projectName() {
    return this.projectForm.get('projectName');
  }

  get ownerEmail() {
    return this.projectForm.get('ownerEmail');
  }


  ResetForm() {
    this.projectForm.reset();
  }

  submitProjectData() {
    this.crudApi.AddProject(this.projectForm.value);
    this.toastr.success(
      this.projectForm.controls['projectName'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}