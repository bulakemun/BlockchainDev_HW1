#!/usr/bin/env node

import * as fs from "fs";
import { program } from 'commander';
import inquirer from 'inquirer';

fs.readFile("data.json", (error, data) => {
    if (error) {
      console.error(error);
      throw error;
    }
    const user = JSON.parse(data);
    // console.log(user);
  });


// inquirer
// .prompt([
//     {
//       name: 'faveReptile',
//       message: 'What is your favorite reptile?',
//       default: 'Alligators'
//     },
//     {
//       name: 'faveColor',
//       message: 'What is your favorite color?',
//       default: '#008f68'
//     },
//   ])
//   .then(answers => {
//     console.info('Answers:', answers);
//   });

program
    .description("First Homework")
    .option("-n, --name <type>", "Add your name")
    .version("1.0.0")
    .action((options) => {
        console.log(`Hey, ${options.name}!`);
    });
program.parse(process.argv);