import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  selectedValue: string;
  id = 0;
  title = 'Ajouter un étudiant :';
  studentTitle ;
  studentContent ;
  Students : Observable<any[]>;
  students: Student[];
  studentsSubscription: Subscription;

  fields: Category[] = [
    {value: 'IBC', viewValue: 'IBC'},
    {value: 'SI', viewValue: 'SI'},
    {value: 'MOC', viewValue: 'MOC'},
    {value: 'SRC', viewValue: 'SRC'},
    {value: 'AL', viewValue: 'AL'},
    {value: 'IAB', viewValue: 'IAB'},
    {value: 'IW', viewValue: 'IW'},
    {value: 'JVC', viewValue: 'JVC'},
    {value: 'MCSI', viewValue: 'MCSI'}
  ];

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router,private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email : ['', Validators.required],
      promo: ['', Validators.required],
      
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.studentService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );

    console.log(file);

    // ça a envoyer


}
  
  onSavePoem() {
    const name = this.studentForm.get('name').value;
    const surname = this.studentForm.get('surname').value;
    const email = this.studentForm.get('surname').value;
    const promo = this.studentForm.get('promo').value;
    const fields = this.selectedValue;
    const newStudent = new Student();
    newStudent.name = name;
    newStudent.surname = surname;
    newStudent.email = email;
    newStudent.promo = promo;
    newStudent.fields = fields;
    if(this.fileUrl && this.fileUrl !== '') {
      newStudent.diploma = this.fileUrl;
    }




    this.studentService.createNewStudent(newStudent);

    this.studentService.sendRequestHash(newStudent.diploma);

    console.log("gg");
    this.fileUploaded = false;
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}

interface Category {
  value: string;
  viewValue: string;
}

