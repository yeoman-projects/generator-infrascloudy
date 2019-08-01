"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const camelCase = require("lodash.camelcase");
const capitalize = require("lodash.capitalize");
const kebabCase = require("lodash.kebabcase");
const snakeCase = require("lodash.snakecase");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome·to·the·neat·${chalk.red("generator-infrascloudy")}·generator!`
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
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );
  }

  install() {
    this.installDependencies();
  }
};
