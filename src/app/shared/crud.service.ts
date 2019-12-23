import { Injectable } from '@angular/core';
import { Student } from '../shared/student';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  

  constructor(private db: AngularFireDatabase) { }


  AddStudent(student: Student) {
    this.studentsRef.push({
      name: student.name,
      course: student.course,
      sem: student.sem
    })
  }

  
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }  

  
  UpdateStudent(student: Student) {
    this.studentRef.update({
      name: student.name,
      course: student.course,
      sem: student.sem
    })
  }  

  
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }
  
}