import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SchoolComponent } from './school/school.component';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { SchoolHomeComponent } from './school-home/school-home.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SingleStudentComponent } from './single-student/single-student.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SchoolComponent,
    SchoolHomeComponent,
    AddStudentComponent,
    StudentListComponent,
    DialogComponent,
    SingleStudentComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AngularFirestoreModule, 
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    AngularFireDatabaseModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [AuthService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
