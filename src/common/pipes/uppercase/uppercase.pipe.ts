import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(
    value: string | Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ): string | Record<string, unknown> {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const transformed: Record<string, unknown> = { ...value };
      for (const key in transformed) {
        if (
          Object.prototype.hasOwnProperty.call(transformed, key) &&
          typeof transformed[key] === 'string'
        ) {
          transformed[key] = String(transformed[key]).toUpperCase();
        }
      }
      return transformed;
    }

    return value;
  }
}
