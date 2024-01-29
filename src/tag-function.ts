export function interpolateStrings<T>(
  strings: TemplateStringsArray,
  interpolations: Array<string | ((ctx: T) => string | number)>,
  templateParams: T
) {
  return strings.reduce((acc, str, index) => {
    acc += str;

    if (index < interpolations.length) {
      const interpolation = interpolations.at(index);
      if (typeof interpolation === 'function') {
        acc += interpolation(templateParams);
      } else {
        acc += interpolation;
      }
    }

    return acc;
  }, '');
}

export function createTagFunction(cb?: (output: string) => any) {
  return <TParams>(
    strings: TemplateStringsArray,
    ...interpolations: Array<string | ((ctx: TParams) => string | number)>
  ) => {
    return (templateParams: TParams) => {
      const output = interpolateStrings(
        strings,
        interpolations,
        templateParams
      );

      return cb ? cb(output) : output;
    };
  };
}
