import { Injectable } from '@angular/core';
import { Student } from './models/student.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Array<Student> = [];
  studentsSubject = new Subject<Student[]>();
  cats: Array<String> = [];
  catSubject = new Subject<String[]>();
  checkSubject = new Subject<Object>();

  constructor(private http: HttpClient,) {
    this.getStudents();
  }

  emitStudents() {
    this.studentsSubject.next(this.students);
  }

  emitCats(cat) {
    this.catSubject.next(cat);
    console.log(cat);
  }

  saveStudents() {
    firebase.database().ref('/Students').set(this.students);
  }

  getStudents() {
    firebase.database().ref('/Students')
      .on('value', (data: DataSnapshot) => {
        this.students = data.val() ? data.val() : [];
        this.emitStudents();
      }
      );
  }



  getSingleStudent(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Students/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewStudent(newStudent: Student) {
    console.log(newStudent);
    this.students.push(newStudent);
    this.saveStudents();
    this.emitStudents();
  }

  removeStudent(student: Student) {
    if (student.diploma) {
      const storageRef = firebase.storage().refFromURL(student.diploma);
      storageRef.delete().then(
        () => {
          console.log('File removed!');
        },
        (error) => {
          console.log('Could not remove file! : ' + error);
        }
      );
    }
    const studentIndexToRemove = this.students.findIndex(
      (studentEl) => {
        if (studentEl === student) {
          return true;
        }
      }
    );
    this.students.splice(studentIndexToRemove, 1);
    this.saveStudents();
    this.emitStudents();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('diplomas/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  removeFiles(student: Student) {
    if (student.diploma) {
      const storageRef = firebase.storage().refFromURL(student.diploma);
      storageRef.delete().then(
        () => {
          console.log('File removed!');
        },
        (error) => {
          console.log('Could not remove file! : ' + error);
        }
      );
    }
  }


  sendRequestHash(fileLink) {

    var storage = firebase.app().storage("diploom-fa308.appspot.com");
    var storageRef = storage.refFromURL(fileLink);

    storageRef.getDownloadURL().then((url) => {
      const headers = { 'Content-Type': 'application/json' }
      const body = { data: url }
      this.http.post<any>('http://localhost:1984/hashFile', body, { headers }).subscribe(data => {
        console.log('kkk:', data);
      })
    });



  }

   checkDiploma(file) {
    let value = false;
    const url = "http://localhost:1984/checkDiploma";
    const body = { data: file };
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, body, headers)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
            this.checkSubject.next(val);
            value = true;
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
        

  }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

}
