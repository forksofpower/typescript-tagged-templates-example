export function interpolateStrings<T>(
  strings: TemplateStringsArray,
  interpolations: Array<string | ((ctx: T) => string | number)>,
  templateParams: T,
) {
  return strings.reduce((acc, str, index) => {
    acc += str;

    if (index < interpolations.length) {
      const interpolation = interpolations.at(index);
      if (typeof interpolation === "function") {
        acc += interpolation(templateParams);
      } else {
        acc += interpolation;
      }
    }

    return acc;
  }, "");
}
