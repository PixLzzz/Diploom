import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase';
import { DialogComponent } from '../dialog/dialog.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})
export class SingleStudentComponent implements OnInit {

  student: Student;
  constructor(private route: ActivatedRoute, private studentService: StudentService,
              private router: Router,public dialog: MatDialog) {}

  ngOnInit() {
    this.student = new Student();
    const id = this.route.snapshot.params['id'];
    this.studentService.getSingleStudent(+id).then(
      (student: Student) => {
        this.student = student;
      }
    );
  }

  onBack() {
    this.router.navigate(['schoolHome']);
  }



}
