import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import * as smtp from '../../assets/smtp';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  file: any;
  studentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  selectedValue: string;
  id = 0;
  title = 'Ajouter un étudiant :';
  studentTitle;
  studentContent;
  Students: Observable<any[]>;
  students: Student[];
  studentsSubscription: Subscription;

  fields: Category[] = [
    { value: 'IBC', viewValue: 'IBC' },
    { value: 'SI', viewValue: 'SI' },
    { value: 'MOC', viewValue: 'MOC' },
    { value: 'SRC', viewValue: 'SRC' },
    { value: 'AL', viewValue: 'AL' },
    { value: 'IAB', viewValue: 'IAB' },
    { value: 'IW', viewValue: 'IW' },
    { value: 'JVC', viewValue: 'JVC' },
    { value: 'MCSI', viewValue: 'MCSI' }
  ];

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
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

    // set email file
    this.file = file;

  }

  sendMail(body: any) {
    const reader = new FileReader();
    reader.readAsDataURL(body.message);

    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function() {
      const base64 = reader.result.toString().split(',')[1];
      smtp.Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'diploomdiploom@gmail.com',
        Password: '9F0B37478074FEF0BF4914ACF23B949385C0',
        To: body.to,
        From: 'diploomdiploom@gmail.com',
        Subject: body.subject,
        Attachments: [
          {
            name: body.message.name,
            data: base64
          }],
        // tslint:disable-next-line:max-line-length
        Body: `<i>Please find your diploma in the attachments.</i> <br /> <b>Email: </b>${body.to}<br /> <b>Name: </b>${body.name}<br /> <b>Surname: </b>${body.surname}<br /> <b>Promo: </b>${body.promo}<br /> <br><br> <b>~Diploom.~</b>`
      }).then(message => {
        alert(message);
      });
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function() {
      console.log('there are some problems');
    };

  }

  handleFile(to: string, name: string, surname: string, promo: string) {
    // ça a envoyer
    const body = {
      // tslint:disable-next-line:object-literal-shorthand
      to: to,
      subject: '🎓🎓 Your diploom 🎓🎓',
      message: this.file,
      // tslint:disable-next-line:object-literal-shorthand
      name: name,
      // tslint:disable-next-line:object-literal-shorthand
      surname: surname,
      // tslint:disable-next-line:object-literal-shorthand
      promo: promo,
    };
    this.sendMail(body);
  }


  onSavePoem() {
    const name = this.studentForm.get('name').value;
    const surname = this.studentForm.get('surname').value;
    const email = this.studentForm.get('email').value;
    const promo = this.studentForm.get('promo').value;
    const fields = this.selectedValue;
    const newStudent = new Student();
    newStudent.name = name;
    newStudent.surname = surname;
    newStudent.email = email;
    newStudent.promo = promo;
    newStudent.fields = fields;
    if (this.fileUrl && this.fileUrl !== '') {
      newStudent.diploma = this.fileUrl;
    }




    this.studentService.createNewStudent(newStudent);

    this.studentService.sendRequestHash(newStudent.diploma);

    console.log('gg');

    // send email
    this.handleFile(email, name, surname, promo);

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

