import { ValueTransformer } from 'typeorm';

/**
 * The `pg` driver returns `numeric` columns as strings to preserve precision.
 * For prices in this catalogue a JS number is precise enough and far nicer to
 * consume from the API, so we convert on the way out.
 */
export class NumericTransformer implements ValueTransformer {
  to(value: number | null): number | null {
    return value;
  }

  from(value: string | null): number | null {
    return value === null ? null : parseFloat(value);
  }
}
