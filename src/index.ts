import chalk from "chalk";
import yaml, { Document } from "yaml";
import { createStringTemplate } from "./generic.js";
import { yml } from "./yaml.js";

function printHeading(s: string) {
  console.log(chalk.magenta(s));
}

const htmlTemplate = createStringTemplate<{ title: string }>`
  <html>
    <head>
      <title>${(t) => t.title}</title>
    </head>
    <body>
      <h1>${(t) => t.title}</h1>
    </body>
  </html>
`;

const html = htmlTemplate({ title: "TESTING" });
printHeading("HTML output:");
console.log(html);

/* Yaml Example */
const yamlTemplate = yml<{
  occupation: string;
  city: string;
  id: number;
  friends: number[];
}>`
  name: Patrick
  age: 30
  occupation: ${(t) => t.occupation}
  address:
    city: ${(t) => t.city}
    state: Texas
  id: ${(t) => t.id}
  # yaml can be injected from an interpolation function
  ${({ friends }) => yaml.stringify({ friends })}
`;

const user = yamlTemplate({
  occupation: "Software Engineer",
  city: "El Paso",
  id: 34253254234,
  friends: [234234, 345345, 567567],
});

printHeading("Yaml output:");
console.log(user.yaml);
printHeading("Parsed JSON:");
console.log(user.json);
