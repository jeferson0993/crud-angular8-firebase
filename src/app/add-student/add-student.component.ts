import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  public studentForm: FormGroup;
 
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();
    this.studenForm();
  }

  
  studenForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      course: [''],
      sem: ['']
    })  
  }

  
  get name() {
    return this.studentForm.get('name');
  }

  get course() {
    return this.studentForm.get('course');
  }  

  get sem() {
    return this.studentForm.get('sem');
  }

  ResetForm() {
    this.studentForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddStudent(this.studentForm.value);
    this.toastr.success(this.studentForm.controls['name'].value + ' cadastrado(a)!');
    this.ResetForm();
   };

}