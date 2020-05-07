import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private studentService : StudentService, private formBuilder: FormBuilder) { }
  studentForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  file : string;
  cheminImage:any = "/front-diploom/src/app/img/logopa.png";

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
  
    
    });
  }

  onCheckDiploma(){
    if(this.fileUrl && this.fileUrl !== '') {
      this.file = this.fileUrl;
    }
    this.studentService.checkDiploma(this.file);
  }





  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
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


}
}
