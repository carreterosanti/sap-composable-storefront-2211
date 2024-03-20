import { NgModule } from '@angular/core';
import { PRODUCT_NORMALIZER } from '@spartacus/core';
import { ProductPriceBitcoinNormalizer } from './product-price-bitcoin-normalizer';

@NgModule({
  providers: [
    {
      provide: PRODUCT_NORMALIZER,
      useExisting: ProductPriceBitcoinNormalizer,
      multi: true,
    },
  ],
})
export class NormalizersModule {}
