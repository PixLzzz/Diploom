import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isConnected : boolean;
  currentUser = "";
  constructor(private router : Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isConnected = true;
          this.currentUser = firebase.auth().currentUser.email;
        } else {
          this.isConnected = false;
        }
      }
    );
  }
  logOut(){
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful."),
      this.router.navigate(['/login']);
    }).catch(function(error) {
      console.log("error")
    });
  
  }

  

}
