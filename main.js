#!/usr/bin/env node

import * as fs from "fs";
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from "chalk";
import figlet from "figlet";

const data = fs.readFileSync('data.json', 'utf8')
let parsedData = JSON.parse(data);
const userBalanceA = parsedData.userBalance.tokenA;
const userBalanceB = parsedData.userBalance.tokenB;
const poolBalanceA = parsedData.pool.tokenA;
const poolBalanceB = parsedData.pool.tokenB;
const ratio = (parsedData.pool.A)/(parsedData.pool.B);
parsedData.pool.tokenA = 99;
// fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));

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
                    inquirer
                        .prompt([
                            {
                                type: "number",
                                name: "numA",
                                required: 1,
                                message: "How much Token A would you like to add?",
                                validate: ((num) => (num < userBalanceA))
                            },
                            {
                                type: "number",
                                name: "numB",
                                required: 1,
                                message: "How much Token B would you like to add?",
                                validate: ((num) => (num < userBalanceB))
                            },
                        ])
                        .then();
                    break;
                case "Swap":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "direction",
                            message: "Which direction?",
                            choices: ["A --> B", "B --> A"]
                        },
                    ])
                    .then((result) => {
                        switch(result.direction) {
                            case "A --> B":
                                inquirer.prompt([
                                    {
                                        type: "number",
                                        name: "amount",
                                        required: 1,
                                        message: "How much?",
                                        validate: ((num) => (num < userBalanceA && ((num/ratio) < poolBalanceB)))
                                    }
                                ])
                                break;
                            case "B --> A":
                                break;
                        };
                    });
                    break;
                case "Havuz Durumunu Görüntüle":
                    console.log(chalk.green(`Pool Balance A: ${poolBalanceA}\nPool Balance B: ${poolBalanceB}\nRatio: ${ratio}`));
                    break;
                case "Kullanıcı Bakiyesini Görüntüle":
                    console.log(chalk.green(`User Balance A: ${userBalanceA}\nUser Balance B: ${userBalanceB}`));
                    break;
                case "Çıkış":
                    break;
            }
          });
      });
program.parse(process.argv);