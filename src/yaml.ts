import yaml from "yaml";
import { interpolateStrings } from "./interpolate.js";

// Yaml template factory
export function yml<T>(
  strings: TemplateStringsArray,
  ...interpolations: Array<string | ((ctx: T) => string | number)>
) {
  return function (templateParams: T) {
    const rawYaml = interpolateStrings(strings, interpolations, templateParams);
    return {
      yaml: rawYaml,
      json: yaml.parse(rawYaml),
    };
  };
}
