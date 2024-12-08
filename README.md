# BlockchainDev_HW1

## Description

This project is a command-line application for managing a simple blockchain-based token exchange and liquidity pool system. It allows users to add liquidity, swap tokens, view pool status, and view user balances. The application uses Node.js and several libraries including `commander`, `inquirer`, `chalk`, and `figlet`.

## Features

- **Add Liquidity**: Users can add liquidity to the pool by specifying amounts of Token A and Token B.
- **Swap Tokens**: Users can swap tokens between Token A and Token B.
- **View Pool Status**: Users can view the current balances of Token A and Token B in the pool.
- **View User Balance**: Users can view their current balances of Token A and Token B.
- **Exit**: Users can exit the application.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/bulakemun/BlockchainDev_HW1.git
    cd BlockchainDev_HW1
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Run the application:
    ```
    blockchain-hw1 start
    ```

2. Follow the prompts to interact with the application.

## Dependencies

- [commander](https://www.npmjs.com/package/commander)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [chalk](https://www.npmjs.com/package/chalk)
- [figlet](https://www.npmjs.com/package/figlet)
- [fs](https://nodejs.org/api/fs.html)

## File Structure

- `main.js`: The main script that contains the application logic.
- `data.json`: The JSON file that stores the user and pool data.
