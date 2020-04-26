import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../models/student.model';
import { Subscription } from 'rxjs';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];
  cats : String[];
  studentsSubscription: Subscription;
  catSubscription : Subscription;
  displayedColumns: string[] = ['Nom', 'Prenom', 'Filiere', 'Actions'];
  dataSource ;
  onChange;
  user;
  @Input() selectedOption : any;
  constructor(private studentService: StudentService, private router: Router,public dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.studentsSubscription = this.studentService.studentsSubject.subscribe(
      (students: Student[]) => {
        this.students = students;
        this.dataSource = new MatTableDataSource(this.students);
      }
    );

    this.catSubscription = this.studentService.catSubject.subscribe(
      (cats: String[]) => {
        this.dataSource = new MatTableDataSource(this.students);
        this.cats = cats;
        console.log(cats);
        this.cats.forEach(x => {
          this.dataSource.filter = x.trim().toLowerCase();
        })
        
      }
    );
   /* this.onChange = this.selectedOption.subscribe(() => {
      this.catFilter();
 })*/
  console.log(this.selectedOption)
    this.studentService.emitStudents();
  }

  onNewStudent() {
    this.router.navigate(['', 'new']);
  }

  onDeleteStudent(student : Student){
    this.studentService.removeStudent(student);
  }

  onViewStudent(id: number) {
    this.router.navigate(['/singleStudent', id]);
  }
  
  ngOnDestroy() {
    this.studentsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  catFilter(){

    this.dataSource.filter = this.selectedOption.trim().toLowerCase();
    console.log(this.dataSource.filter);
    
  }

  openDialog(student : Student): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result==1){
        this.onDeleteStudent(student);
      }
    });
  }

}
