import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})

export class EditProjectComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateProjectData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetProject(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  get projectName() {
    return this.editForm.get('projectName');
  }


  get ownerEmail() {
    return this.editForm.get('ownerEmail');
  }

  updateProjectData() {
    this.editForm = this.fb.group({
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

  goBack() {
    this.location.back();
  }

  updateForm() {
    this.crudApi.UpdateProject(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['projectName'].value + ' updated successfully'
    );
    this.router.navigate(['view-projects']);
  }
}