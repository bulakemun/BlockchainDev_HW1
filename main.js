#!/usr/bin/env node

import * as fs from "fs";
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from "chalk";
import figlet from "figlet";

fs.readFile("data.json", (error, data) => {
    if (error) {
      console.error(error);
      throw error;
    }
    const user = JSON.parse(data);
    // console.log(user);
  });


program
    .description("First Homework")
    .version("1.0.0")
    .command('start')
    .action(() => {
        console.log(chalk.yellow(figlet.textSync("Homework 1", {horizontalLayout: "full"})));
        inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Choose one:",
              choices: ["Likidite Ekle", "Swap", "Havuz Durumunu Görüntüle", "Kullanıcı Bakiyesini Görüntüle", "Çıkış"]
            },
          ])
          .then((answers) => {
            console.log(chalk.green(answers.name));
          });
      });
program.parse(process.argv);