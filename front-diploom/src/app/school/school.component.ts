import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  user;
  constructor(private authService : AuthService, private router : Router) { }
  isAuth : boolean;
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.user = firebase.auth().currentUser.email;
          this.router.navigate(['/schoolHome']);
        } else {
          this.isAuth = false;
          this.router.navigate(['/login']);
        }
      }
    );
  
    if(firebase.auth().currentUser){
      this.isAuth = true;
      console.log(this.isAuth)
    }
  }

}
