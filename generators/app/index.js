"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const camelCase = require("lodash.camelcase");
const capitalize = require("lodash.capitalize");
const kebabCase = require("lodash.kebabcase");
const snakeCase = require("lodash.snakecase");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(
        `O! I hear you would like a minimalistic scaffold with a React front-end, a Flask back-end, a gulpfile, Webpack config, Less, and Mocha tests
        Welcome to the ${chalk.green("infrascloudy")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "appName",
        message: "What is the name of your project?",
        default: this.appname,
        store: true
      },
      {
        type: "input",
        name: "userName",
        message: "What is your name? (Used for the package.json.)",
        store: true
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address? (Used for the package.json.)",
        store: true
      },
      {
        type: "input",
        name: "github",
        message: "What is your GitHub user name? (Used for the package.json.)",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.kebabName = kebabCase(this.props.appName);
      this.snakeName = snakeCase(this.props.appName);
      this.pascalName = capitalize(camelCase(this.props.appName));
      this.user = {
        name: this.props.userName,
        email: this.props.email,
        github: this.props.github
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("gulpfile.js"),
      this.destinationPath("gulpfile.js"),
      {
        date: new Date().toISOString().split("T")[0],
        name: this.props.appName,
        version: "1.0.0"
      }
    );

    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        kebabName: this.kebabName,
        snakeName: this.snakeName,
        user: {
          name: this.user.name,
          email: this.user.email,
          github: this.user.github
        }
      }
    );
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("README"),
      this.destinationPath("README.md"),
      {
        appName: this.kebabName
      }
    );
    this.fs.copy(
      this.templatePath("editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copy(
      this.templatePath("babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copy(
      this.templatePath("eslintrc"),
      this.destinationPath(".eslintrc.json")
    );
    this.fs.copy(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("src/js/main.js"),
      {
        componentName: this.pascalName
      }
    );
    this.fs.copy(
      this.templatePath("component.jsx"),
      this.destinationPath("src/js/components/" + this.kebabName + ".jsx")
    );

    this.fs.copyTpl(
      this.templatePath("component-test.jsx"),
      this.destinationPath("test/components/" + this.kebabName + "-test.jsx"),
      {
        componentName: this.pascalName,
        kebabName: this.kebabName
      }
    );

    this.fs.copy(
      this.templatePath("api.py"),
      this.destinationPath(this.snakeName + ".py")
    );

    this.fs.copyTpl(
      this.templatePath("api_tests.py"),
      this.destinationPath(this.snakeName + "_tests.py"),
      {
        appName: this.pascalName
      }
    );

    this.fs.copy(
      this.templatePath("index.html"),
      this.destinationPath("templates/index.html")
    );

    this.fs.copy(
      this.templatePath("requirements.txt"),
      this.destinationPath("requirements.txt")
    );
  }

  install() {
    this.installDependencies();
  }
};
