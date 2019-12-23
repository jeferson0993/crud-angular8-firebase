import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent implements OnInit {
  editForm: FormGroup; 
  
  constructor(
    private crudApi: CrudService, 
    private fb: FormBuilder, 
    private location: Location,
    private actRoute: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService 
  ){ }

  ngOnInit() {
    this.updateStudentData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetStudent(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)
    })
  }


  get name() {
    return this.editForm.get('name');
  }

  get course() {
    return this.editForm.get('course');
  }

  get sem() {
    return this.editForm.get('sem');
  }  

  
  updateStudentData() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      course: [''],
      sem: ['']
    })
  }

  
  goBack() {
    this.location.back();
  }


  updateForm(){
    this.crudApi.UpdateStudent(this.editForm.value);
    this.toastr.info(this.editForm.controls['name'].value + ' alterado(a)!');
    this.router.navigate(['view-students']);
  }

}