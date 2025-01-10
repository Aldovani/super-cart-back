import { registerDecorator, ValidationOptions } from 'class-validator';
import validateCNPJ from 'src/utils/is-valid-cnpj';

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCnpj',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'value is not a CNPJ',
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return validateCNPJ(value);
        },
      },
    });
  };
}
