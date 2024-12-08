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
const curPrice = Math.round(((parsedData.pool.tokenA/parsedData.pool.tokenB) + Number.EPSILON) * 100) / 100;
// console.log(curPrice)
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
                                type: "list",
                                name: "direction",
                                required: 1,
                                message: "From which token would you like to calculate from?",
                                choices: ["From A", "From B"]
                            }
                        ])
                        .then((result) => {
                            switch(result.direction) {
                                case "From A":
                                    inquirer
                                        .prompt([
                                            {
                                                type: "number",
                                                name: "amount",
                                                required: 1,
                                                message: "How much A?",
                                                validate: ((num) => (num <= userBalanceA))
                                            }])
                                        .then((result) => {
                                            inquirer.prompt([{
                                                type: "confirm",
                                                name: "okay",
                                                required: 1,
                                                message: `You need ${Math.round((result.amount / curPrice + Number.EPSILON)*100)/100} B, confirm?`
                                            }]);
                                        })
                                    break;
                                case "From B":
                                    break;
                            };
                        });
                    break;
                case "Swap":
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "direction",
                            required: 1,
                            message: "Which direction?",
                            choices: ["A --> B", "B --> A"]
                        }
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
                                        validate: ((num) => (num <= userBalanceA))
                                    }
                                ])
                                .then((result) => {
                                    const bBought = (parsedData.pool.tokenB * result.amount)/(parsedData.pool.tokenA + result.amount);
                                    parsedData.userBalance.tokenA -= (result.amount);
                                    parsedData.pool.tokenA += (result.amount);
                                    parsedData.userBalance.tokenB += bBought;
                                    parsedData.pool.tokenB -= bBought;
                                    parsedData.userBalance.tokenA = parseFloat(parsedData.userBalance.tokenA.toFixed(2));
                                    parsedData.userBalance.tokenB = parseFloat(parsedData.userBalance.tokenB.toFixed(2));
                                    parsedData.pool.tokenA = parseFloat(parsedData.pool.tokenA.toFixed(2));
                                    parsedData.pool.tokenB = parseFloat(parsedData.pool.tokenB.toFixed(2));
                                    fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));
                                });
                                break;
                            case "B --> A":
                                inquirer.prompt([
                                    {
                                        type: "number",
                                        name: "amount",
                                        required: 1,
                                        message: "How much?",
                                        validate: ((num) => (num <= userBalanceB))
                                    }
                                ])
                                .then((result) => {
                                    const aBought = (parsedData.pool.tokenA * result.amount)/(parsedData.pool.tokenB + result.amount);
                                    parsedData.userBalance.tokenB -= (result.amount);
                                    parsedData.pool.tokenB += (result.amount);
                                    parsedData.userBalance.tokenA += aBought;
                                    parsedData.pool.tokenA -= aBought;
                                    parsedData.userBalance.tokenA = parseFloat(parsedData.userBalance.tokenA.toFixed(2));
                                    parsedData.userBalance.tokenB = parseFloat(parsedData.userBalance.tokenB.toFixed(2));
                                    parsedData.pool.tokenA = parseFloat(parsedData.pool.tokenA.toFixed(2));
                                    parsedData.pool.tokenB = parseFloat(parsedData.pool.tokenB.toFixed(2));
                                    fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));
                                });
                                break;
                        };
                    });
                    break;
                case "Havuz Durumunu Görüntüle":
                    console.log(chalk.white.bold(`Pool Balance A: ${chalk.red(poolBalanceA)}\nPool Balance B: ${chalk.red(poolBalanceB)}\nConstant: ${chalk.red(aTimesB)}`));
                    break;
                case "Kullanıcı Bakiyesini Görüntüle":
                    console.log(chalk.white.bold(`User Balance A: ${chalk.red(userBalanceA)}\nUser Balance B: ${chalk.red(userBalanceB)}`));
                    break;
                case "Çıkış":
                    break;
            }
          });
      });
program.parse(process.argv);

