import chalk from 'chalk';
import yaml from 'yaml';
import { createTagFunction } from './tag-function.js';
import { highlight } from 'cli-highlight';

/**
 * Utils
 */
function printHeading(s: string) {
  console.log(chalk.magenta(s));
}
function printHtml(s: string) {
  console.log(highlight(s, { language: 'html' }));
}
function printYaml(s: string) {
  console.log(highlight(s, { language: 'yaml' }));
}

/**
 * Template factories
 */
export const htmlTemplate = createTagFunction();
export const yamlTemplate = createTagFunction(output => ({
  yaml: output,
  json: yaml.parse(output),
}));

/**
 * Typed Templates
 */
const htmlDoc = htmlTemplate<{ title: string }>`
  <html>
    <head>
      <title>${t => t.title}</title>
    </head>
    <body>
      <h1>${t => t.title}</h1>
    </body>
  </html>
`;

interface User {
  occupation: string;
  city: string;
  id: number;
  friends: number[];
}
const userYaml = yamlTemplate<User>`
  id: ${t => t.id}
  name: Patrick
  age: 30
  occupation: ${t => t.occupation}
  address:
    city: ${t => t.city}
    state: Texas
  # yaml can be injected from an interpolation function
  ${({ friends }) => yaml.stringify({ friends })}
`;

// Usage examples
const html = htmlDoc({ title: 'TESTING' });

const user = userYaml({
  occupation: 'Software Engineer',
  city: 'El Paso',
  id: 34253254234,
  friends: [234234, 345345, 567567],
});

printHeading('HTML');
printHtml(html);
printHeading('Yaml');
printYaml(user.yaml);
