import { Injectable } from '@angular/core';
import { BehaviorSubject , of , combineLatest } from 'rxjs';
import { cleanBlank , ifEmpty , validObs , onlyNumber , creditCardLength } from './validation';

@Injectable({ providedIn: 'root' })
export class ValidationProductService {

    subNameOfProduct: BehaviorSubject<string>;
    obsNameOfProduct: any;

    subDescriptionOfProduct: BehaviorSubject<string>;
    obsDescriptionOfProduct: any;

    subPriceOfProduct: BehaviorSubject<string>;
    obsPriceOfProduct: any;

    subCostOfProduct: BehaviorSubject<string>;
    obsCostOfProduct: any;

    subImageOfProduct: BehaviorSubject<string>;
    obsImageOfProduct: any;

    click$: boolean;

    constructor(){ }

    initValidation(): void {

      this.subNameOfProduct = new BehaviorSubject<string>('');
      this.obsNameOfProduct =  of(true);

      this.subDescriptionOfProduct = new BehaviorSubject<string>('');
      this.obsDescriptionOfProduct =  of(true);

      this.subPriceOfProduct = new  BehaviorSubject<string>('');
      this.obsPriceOfProduct =  of(true);

      this.subCostOfProduct = new BehaviorSubject<string>('');
      this.obsCostOfProduct = of(true);

      this.subImageOfProduct = new BehaviorSubject<string>('');
      this.obsImageOfProduct = of(true);
    }

    inputNameOfProduct(str: string): void{
        this.subNameOfProduct.next(str);
        this.obsNameOfProduct = this.subNameOfProduct.pipe(
                  cleanBlank,
                      ifEmpty);
    }


    inputDescriptionOfProduct(str: string): void{
      this.subDescriptionOfProduct.next(str);
      this.obsDescriptionOfProduct = this.subDescriptionOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputPriceOfProduct(str: string): void{
      this.subPriceOfProduct.next(str);
      this.obsPriceOfProduct = this.subPriceOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputCostOfProduct(str: string): void{
      this.subCostOfProduct.next(str);
      this.obsCostOfProduct = this.subCostOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputImageOfProduct(str: string): void{
      this.subImageOfProduct.next(str);
      this.obsImageOfProduct = this.subImageOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    ifGood(): boolean{
        this.click$ = false;
        this.obsNameOfProduct = this.subNameOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsDescriptionOfProduct = this.subDescriptionOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsPriceOfProduct = this.subPriceOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsCostOfProduct = this.subCostOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsImageOfProduct = this.subImageOfProduct.pipe(cleanBlank, ifEmpty);

        combineLatest(
          [
            this.obsNameOfProduct.pipe(validObs),
            this.obsDescriptionOfProduct.pipe(validObs),
            this.obsPriceOfProduct.pipe(validObs),
            this.obsCostOfProduct.pipe(validObs),
            this.obsImageOfProduct.pipe(validObs)
          ]
          ).subscribe(() => this.click$ =  true );

        if (this.click$){
            return true;
          }
        return false;
      }

}
