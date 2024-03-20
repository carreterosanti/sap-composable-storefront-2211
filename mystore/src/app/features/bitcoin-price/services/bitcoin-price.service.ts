import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitcoinPriceService {
  public static readonly SIMBOL = '₿';

  private currentBitcoinValue: BehaviorSubject<number> =
    new BehaviorSubject<number>(101);

  constructor() {}

  public getCurrentBitcoinValue(): Observable<number> {
    return this.currentBitcoinValue.asObservable();
  }
}
