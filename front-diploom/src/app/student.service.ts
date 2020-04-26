import { Injectable } from '@angular/core';
import { Student } from './models/student.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    students: Array<Student> = [];
    studentsSubject = new Subject<Student[]>();
    cats : Array<String> = [];
    catSubject = new Subject<String[]>();

    constructor(private http: HttpClient,) {
      this.getStudents();
    }

    emitStudents(){
      this.studentsSubject.next(this.students);
    }

    emitCats(cat){
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
      if(student.diploma) {
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
          if(studentEl === student) {
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

  removeFiles(student : Student){
    if(student.diploma) {
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

}
