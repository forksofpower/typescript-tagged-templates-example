type Interpolations<TParams> = Array<
  string | ((ctx: TParams) => string | number)
>;
type Func = (output: string) => any;

/**
 * Interpolates a template string with the given parameters.
 *
 * @param strings The template strings array, part of a tagged template literal.
 * @param interpolations The array of functions and strings to interpolate into the template.
 * @param templateParams The parameters to be passed to interpolation functions.
 * @returns The resulting string after interpolating the template strings with the provided parameters.
 */
export function interpolateStrings<TParams>(
  strings: TemplateStringsArray,
  interpolations: Interpolations<TParams>,
  templateParams: TParams
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

// overload: no callback -> return string
export function createTagFunction(): <TParams>(
  strings: TemplateStringsArray,
  ...interpolations: Interpolations<TParams>
) => (templateParams: TParams) => string;

// overload: callback -> return callback
export function createTagFunction<TCallback extends Func>(
  cb: TCallback
): <TParams>(
  strings: TemplateStringsArray,
  ...interpolations: Interpolations<TParams>
) => (templateParams: TParams) => ReturnType<TCallback>;

/**
 * createTagFunction is a higher-order function that creates a template tag function.
 * It can be called with an optional callback to process the generated string.
 *
 * @param cb An optional callback function that takes the generated string and returns a processed value.
 * @returns A function that takes template strings and interpolations and returns a function
 *          that takes template parameters and returns the processed string or the original string if no callback
 *          is provided.
 */
export function createTagFunction<TCallback extends Func>(cb?: TCallback) {
  return <TParams>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolations<TParams>
  ) => {
    return (templateParams: TParams): ReturnType<TCallback> | string => {
      const output = interpolateStrings(
        strings,
        interpolations,
        templateParams
      );

      return cb ? cb(output) : output;
    };
  };
}
