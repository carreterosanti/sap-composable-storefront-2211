import { Injectable } from '@angular/core';
import { Converter, Occ, Product } from '@spartacus/core';
import { BitcoinPriceService } from '../../features/bitcoin-price/services/bitcoin-price.service';

@Injectable({ providedIn: 'root' })
export class ProductPriceBitcoinNormalizer
  implements Converter<Occ.Product, Product>
{
  constructor(protected bitcoinPriceService: BitcoinPriceService) {}

  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) } as Product;
    }
    if (source.price) {
      this.bitcoinPriceService
        .getCurrentBitcoinValue()
        .subscribe((bitcoinValue) => {
          const priceInBitcoin = this.rountToTwoDecimals(
            (source.price.value
              ? source.price.value
              : parseFloat(source.price.formattedValue.replace('$', ''))) /
              bitcoinValue
          );

          target.price = {
            value: priceInBitcoin,
            formattedValue: `${BitcoinPriceService.SIMBOL}${priceInBitcoin}`,
          };
        });
    }
    return target;
  }

  private rountToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
