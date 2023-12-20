import path from "path";

/**
 * TypeScript support for Plopfile is announced for v4.1.0, please check the repo sometimes to see
 * if it's released.
 */

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("Component", {
    description: "Create a React+TypeScript component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name :",
      },
      {
        type: "input",
        name: "path",
        message: "Path to subdirectory (if any) :",
        default: ".",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{path}}/{{pascalCase name}}.tsx",
        templateFile: "plop/component.tsx.hbs",
      },
    ],
  });
  plop.setGenerator("Page", {
    description: "Create a Next.js page",
    prompts: [
      {
        type: "input",
        name: "filename",
        message: "File name (e.g. articles, [slug], ...) :",
      },
      {
        type: "input",
        name: "name",
        message: "Page Component name : (e.g. Articles, Article, ...) :",
      },
      {
        type: "input",
        name: "path",
        message: "Path to subdirectory (if any) :",
        default: ".",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/app/{{path}}/{{filename}}.tsx",
        templateFile: "plop/page.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/pages/{{pascalCase name}}PageComponent.tsx",
        templateFile: "plop/pageComponent.tsx.hbs",
      },
    ],
  }),
    plop.setHelper("pageComponentRelativePath", (filepath, name) => {
      const origin = `/pages/${filepath}`;

      const destination = `/components/pages/${name}PageComponent`;

      const relativePath = path.relative(origin, destination);

      return relativePath;
    }),
    plop.setHelper("pageRelativePath", (filepath, name) => {
      const origin = `/component/pages/`;

      const destination = `/pages/${filepath}/${name}`;

      const relativePath = path.relative(origin, destination);

      return relativePath;
    });
}
