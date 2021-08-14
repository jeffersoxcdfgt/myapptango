import { Injectable } from '@angular/core';
import { BehaviorSubject , of , combineLatest } from 'rxjs';
import { cleanBlank , ifEmpty , validObs , onlyNumber , creditCardLength } from './validation';


@Injectable({ providedIn: 'root' })
export class ValidationPaymentService {

  subNameOfCard: BehaviorSubject<string>;
  obsNameOfCard: any;

  subCardNumber: BehaviorSubject<string>;
  obsCardNumber: any;

  subOnlyNumber: BehaviorSubject<string>;
  obsOnlyNumber: any;

  subLengthCard: BehaviorSubject<string>;
  obsLengthCard: any;

  subSecurityCode: BehaviorSubject<string>;
  obsSecurityCode: any;

  click$: boolean;

  constructor(){ }


  initValidation(): void {

    this.subNameOfCard = new BehaviorSubject<string>('');
    this.obsNameOfCard =  of(true);

    this.subCardNumber = new BehaviorSubject<string>('');
    this.obsCardNumber =  of(true);

    this.subOnlyNumber = new BehaviorSubject<string>('');
    this.obsOnlyNumber =  of(true);

    this.subLengthCard = new BehaviorSubject<string>('');
    this.obsLengthCard =  of(true);

    this.subSecurityCode = new BehaviorSubject<string>('');
    this.obsSecurityCode =  of(true);
  }

  inputNameOfCard(str: string): void{
    this.subNameOfCard.next(str);
    this.obsNameOfCard = this.subNameOfCard.pipe(
              cleanBlank,
                  ifEmpty);
  }

  inputCardNumber(str: string): void{
    this.subCardNumber.next(str);
    this.obsCardNumber = this.subCardNumber.pipe(
              cleanBlank,
                  ifEmpty);
  }

  inputCardOnlyNumber(str: string): void {
    this.subOnlyNumber.next(str);
    this.obsOnlyNumber = this.subOnlyNumber.pipe(
            onlyNumber
    );
  }

  inputLengthCard(str: string): void {
    this.subLengthCard.next(str);
    this.obsLengthCard = this.subLengthCard.pipe(
         creditCardLength
    );
  }

  inputSecurityCode(str: string): void{
    this.subSecurityCode.next(str);
    this.obsSecurityCode = this.subSecurityCode.pipe(
              cleanBlank,
                  ifEmpty);
  }


  ifGood(): boolean{
    this.click$ = false;
    this.obsNameOfCard = this.subNameOfCard.pipe(cleanBlank, ifEmpty);
    this.obsCardNumber = this.subCardNumber.pipe(cleanBlank, ifEmpty);
    this.obsLengthCard = this.subLengthCard.pipe(creditCardLength);
    this.obsSecurityCode = this.subSecurityCode.pipe(cleanBlank, ifEmpty);

    combineLatest(
        [this.obsNameOfCard.pipe(validObs),
        this.obsCardNumber.pipe(validObs),
        this.obsLengthCard.pipe(validObs),
        this.obsSecurityCode.pipe(validObs)]
      ).subscribe(() => this.click$ =  true );

    if (this.click$){
        return true;
      }
    return false;
  }

}
