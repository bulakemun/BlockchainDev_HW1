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
const aTimesB = parsedData.pool.K;
const curPrice = parsedData.pool.tokenA/parsedData.pool.tokenB;
// fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));

function twoDecimal(parsedData) {
    parsedData.userBalance.tokenA = parseFloat(parsedData.userBalance.tokenA.toFixed(2));
    parsedData.userBalance.tokenB = parseFloat(parsedData.userBalance.tokenB.toFixed(2));
    parsedData.pool.tokenA = parseFloat(parsedData.pool.tokenA.toFixed(2));
    parsedData.pool.tokenB = parseFloat(parsedData.pool.tokenB.toFixed(2));
    return parsedData;
};

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
                                                message: `You need ${parseFloat((result.amount / curPrice).toFixed(2))} B, confirm?`
                                            }]).then((answer) => {
                                                if(answer.okay) {
                                                    parsedData.userBalance.tokenA -= result.amount;
                                                    parsedData.userBalance.tokenB -= (result.amount / curPrice);
                                                    parsedData.pool.tokenA += result.amount
                                                    parsedData.pool.tokenB += (result.amount / curPrice);
                                                    twoDecimal(parsedData);
                                                    parsedData.pool.K = parseFloat((parsedData.pool.tokenA * parsedData.pool.tokenB).toFixed(2));
                                                    fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));
                                                }
                                                else
                                                    console.log(chalk.red('Transaction aborted.'));
                                            });
                                        })
                                    break;
                                case "From B":
                                    inquirer
                                        .prompt([
                                            {
                                                type: "number",
                                                name: "amount",
                                                required: 1,
                                                message: "How much B?",
                                                validate: ((num) => (num <= userBalanceB))
                                            }])
                                        .then((result) => {
                                            inquirer.prompt([{
                                                type: "confirm",
                                                name: "okay",
                                                required: 1,
                                                message: `You need ${parseFloat((result.amount * curPrice).toFixed(2))} A, confirm?`
                                            }]).then((answer) => {
                                                if(answer.okay) {
                                                    parsedData.userBalance.tokenB -= result.amount;
                                                    parsedData.userBalance.tokenA -= (result.amount * curPrice);
                                                    parsedData.pool.tokenB += result.amount
                                                    parsedData.pool.tokenA += (result.amount * curPrice);
                                                    twoDecimal(parsedData);
                                                    parsedData.pool.K = parseFloat((parsedData.pool.tokenA * parsedData.pool.tokenB).toFixed(2));
                                                    fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1));
                                                }
                                                else
                                                    console.log(chalk.red.bold('Transaction aborted.'));
                                            });
                                        })
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
                                    const bBought = ((parsedData.pool.tokenB * result.amount)/(parsedData.pool.tokenA + result.amount));
                                    inquirer.prompt([
                                        {
                                            type: "confirm",
                                            name: "okay",
                                            message: `You will recieve ${bBought.toFixed(2)} B, continue?`
                                        }
                                    ]).then(answer => {
                                        if (answer.okay) {
                                        // const bBought = (parsedData.pool.tokenB * result.amount)/(parsedData.pool.tokenA + result.amount);
                                        parsedData.userBalance.tokenA -= result.amount;
                                        parsedData.pool.tokenA += result.amount;
                                        parsedData.userBalance.tokenB += bBought;
                                        parsedData.pool.tokenB -= bBought;
                                        twoDecimal(parsedData);
                                        console.log(chalk.green.bold(`Swapped ${parseFloat(result.amount.toFixed(2))} A for ${parseFloat(bBought.toFixed(2))} B`));
                                        fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1)); }
                                        else
                                            console.log(chalk.red.bold('Transaction aborted.'))});
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
                                    const aBought = ((parsedData.pool.tokenA * result.amount)/(parsedData.pool.tokenB + result.amount));
                                    inquirer.prompt([
                                        {
                                            type: "confirm",
                                            name: "okay",
                                            message: `You will recieve ${aBought.toFixed(2)} A, continue?`
                                        }
                                    ]).then(answer => {
                                        if (answer.okay) {
                                    parsedData.userBalance.tokenB -= result.amount;
                                    parsedData.pool.tokenB += result.amount;
                                    parsedData.userBalance.tokenA += aBought;
                                    parsedData.pool.tokenA -= aBought;
                                    twoDecimal(parsedData);
                                    console.log(chalk.green.bold(`Swapped ${parseFloat(result.amount.toFixed(2))} B for ${parseFloat(aBought.toFixed(2))} A`));
                                    fs.writeFileSync('data.json', JSON.stringify(parsedData, null, 1)); }
                                    else
                                        console.log(chalk.red.bold('Transaction aborted.'))});
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

