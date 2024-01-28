import { interpolateStrings } from "./interpolate.js";

// Generic string template factory using a Tag Function
export function createStringTemplate<T>(
  input: TemplateStringsArray,
  ...interpolations: Array<string | ((props: T) => string)>
) {
  return (templateParams: T) => {
    return interpolateStrings(input, interpolations, templateParams);
  };
}
