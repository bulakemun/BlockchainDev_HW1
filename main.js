#!/usr/bin/env node

import * as fs from "fs";
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from "chalk";
import figlet from "figlet";

const data = fs.readFileSync('data.json', 'utf8')
let userBalanceA = JSON.parse(data).userBalance.tokenA;
let userBalanceB = JSON.parse(data).userBalance.tokenB;
let poolBalanceA = JSON.parse(data).pool.tokenA;
let poolBalanceB = JSON.parse(data).pool.tokenB;
let ratio = JSON.parse(data).pool.K;
console.log(ratio);

program
    .description("First Homework")
    .version("1.0.0")
    .command('start')
    .action(() => {
        console.log(chalk.yellow(figlet.textSync("ITU Blockchain Homework 1", {horizontalLayout: "fitted"})));
        // console.log(userBalanceA);
        inquirer
          .prompt([
            {
              type: "list",
              name: "choice",
              message: "Choose one:",
              choices: ["Likidite Ekle", "Swap", "Havuz Durumunu Görüntüle", "Kullanıcı Bakiyesini Görüntüle", "Çıkış"]
            },
          ])
          .then((result) => {
            switch(result.choice) {
                case "Likidite Ekle":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "num1",
                            message: "Which coin would you like to add liq. to?:",
                            choices: ["tokenA", "tokenB"]
                        },
                    ]);
                case "Swap":
                case "Havuz Durumunu Görüntüle":
                    console.log(chalk.green(`Pool Balance A: ${poolBalanceA}\nPool Balance B: ${poolBalanceB}\nRatio: ${ratio}`));
                case "Kullanıcı Bakiyesini Görüntüle":
                    console.log(chalk.green(`User Balance A: ${userBalanceA}\nUser Balance B: ${userBalanceB}`));
                case "Çıkış":
                    break;
            }
          });
      });
program.parse(process.argv);