import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  checkSubscription: Subscription;
  fileUploaded = false;
  file : string;
  cheminImage = "../../app/img/logopa.png";
  isLooking =false;
  printRes = false;
  notFound = false
  currentTx = "";
  ngOnInit(): void {

    this.studentForm = this.formBuilder.group({
    });
    this.checkSubscription = this.studentService.checkSubject.subscribe(
      (check: Object[]) => {
        this.currentTx = "";
         let aya = JSON.stringify(check);
         console.log(aya)
         this.isLooking =false;
         if(aya.length > 10){
           this.printRes = true;
           this.currentTx = aya;
         }else{
           this.notFound = true;
         }
      }
    );
    
}
  

   onCheckDiploma(){
     this.printRes = false;
    if(this.fileUrl && this.fileUrl !== '') {
      this.file = this.fileUrl;
    }
    this.isLooking = true;
    this.studentService.checkDiploma(this.file);

 
  }


  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
    this.notFound = false;
    this.printRes = false;
    this.fileUploaded = false;
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
