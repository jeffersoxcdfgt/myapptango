import { Injectable } from '@angular/core';
import { BehaviorSubject , combineLatest , of   } from 'rxjs';
import {
  cleanBlank ,
  ifEmpty ,
  ifChecked ,
  validObs ,
  validateEmail ,
  passwordLength } from './validation';


@Injectable({ providedIn: 'root' })
export class ValidationLoginService {

  subEmail: BehaviorSubject<string>;
  obsEmail: any;

  subIfEmail: BehaviorSubject<string>;
  obsifEmail: any;

  subPassword: BehaviorSubject<string>;
  obsPassword: any;

  subPasswordlength: BehaviorSubject<string>;
  obsPasswordlength: any;

  subTerms: BehaviorSubject<boolean>;
  obsTerms: any;

  click$: boolean;

  constructor(){ }


  initValidation(): void {
    this.subEmail = new BehaviorSubject<string>('');
    this.obsEmail =  of(true);

    this.subIfEmail = new  BehaviorSubject<string>('');
    this.obsifEmail =  of(true);

    this.subPassword = new BehaviorSubject<string>('');
    this.obsPassword =  of(true);

    this.subPasswordlength = new BehaviorSubject<string>('');
    this.obsPasswordlength = of(true);

    this.subTerms = new BehaviorSubject<boolean>(false);
    this.obsTerms =  of(true);

  }

  inputEmail(str: string): void{
      this.subEmail.next(str);
      this.obsEmail = this.subEmail.pipe(
                cleanBlank,
                    ifEmpty);
  }

  inputIfemailvalidate( email: string ): void{
    this.subIfEmail.next(email);
    this.obsifEmail = this.subIfEmail.pipe(
                validateEmail);
  }

  inputPassword(str: string): void{
    this.subPassword.next(str);
    this.obsPassword = this.subPassword.pipe(
              cleanBlank,
                  ifEmpty);
}

 inputPasswordlength(str: string): void {
   this.subPasswordlength.next(str);
   this.obsPasswordlength = this.subPasswordlength.pipe(
        passwordLength
   );
 }

 inputTerms(checked: boolean): void{
   this.subTerms.next(checked);
   this.obsTerms = this.subTerms.pipe(ifChecked);
}


  ifGood(): boolean{
      this.click$ = false;
      this.obsEmail = this.subEmail.pipe(cleanBlank, ifEmpty);
      this.obsifEmail  = this.subIfEmail.pipe(validateEmail);
      this.obsPassword = this.subPassword.pipe(cleanBlank, ifEmpty);
      this.obsPasswordlength = this.subPasswordlength.pipe(passwordLength);
      this.obsTerms = this.subTerms.pipe(ifChecked);

      combineLatest(
        [this.obsEmail.pipe(validObs),
        this.obsifEmail.pipe(validObs),
        this.obsPassword.pipe(validObs),
        this.obsPasswordlength.pipe(validObs),
        this.obsTerms.pipe(validObs)]
      ).subscribe(() => this.click$ =  true );

      if (this.click$){
        return true;
      }
      return false;
  }

}
