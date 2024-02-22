import { registerDecorator } from "class-validator";

export function isNotWhiteSpace(property: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNotBlank",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${property} should not contain only white spaces`,
      },
      validator: {
        validate(value: any) {
          return typeof value === "string" && value.trim().length > 0;
        }
      }
    });
  };
}