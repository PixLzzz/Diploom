import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as smtp from '../../assets/smtp';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  diploomMail = 'diploomdiploom@gmail.com';
  msgSent = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.msgSent = false;
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendMessage() {

    const name = this.contactForm.get('name').value;
    const email = this.contactForm.get('email').value;
    const message = this.contactForm.get('message').value;
    // ça a envoyer
    const body = {
      // tslint:disable-next-line:object-literal-shorthand
      to: this.diploomMail,
      subject: '🎓🎓 NEW MESSAGE FROM DIPLOOM.COM 🎓🎓',
      // tslint:disable-next-line:object-literal-shorthand
      message: message,
      // tslint:disable-next-line:object-literal-shorthand
      name: name,
      // tslint:disable-next-line:object-literal-shorthand
      fromMail: email,
    };
    this.sendMail(body);
  }


  sendMail(body: any) {
    let vm = this;
    smtp.Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'diploomdiploom@gmail.com',
      Password: '9F0B37478074FEF0BF4914ACF23B949385C0',
      To: body.to,
      From: this.diploomMail,
      Subject: body.subject,
      // tslint:disable-next-line:max-line-length
      Body: `<i>You received a new message from diploom.com : </i> <br /> <b>From Email: </b>${body.fromMail}<br /> <b>Name: </b>${body.name}<br /> <b>Message: </b>${body.message}<br /> <br> <b>~Diploom.~</b>`
    }).then(message => {
      console.log(message);
      if (message === 'OK') {
        vm.msgSent = true;
      }

    });

  }

}
