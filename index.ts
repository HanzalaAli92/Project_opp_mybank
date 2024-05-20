#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.italic.yellow.bold(`\n\t
██████╗ ██████╗ ██████╗    ███╗   ███╗██╗   ██╗██████╗  █████╗ ███╗   ██╗██╗  ██╗
██╔═══██╗██╔══██╗██╔══██╗   ████╗ ████║╚██╗ ██╔╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝
██║   ██║██████╔╝██████╔╝   ██╔████╔██║ ╚████╔╝ ██████╔╝███████║██╔██╗ ██║█████╔╝ 
██║   ██║██╔═══╝ ██╔═══╝    ██║╚██╔╝██║  ╚██╔╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗ 
╚██████╔╝██║     ██║███████╗██║ ╚═╝ ██║   ██║   ██████╔╝██║  ██║██║ ╚████║██║  ██╗
 ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝\n\t`))
// Bank Account Interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(account: number): void;
  deposit(account: number): void;
  checkBalance(): void;
}

// Bank Account Class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }
    
  // Debit money
  withdraw(account: number): void {
    if (this.balance >= account) {
      this.balance -= account;
      console.log(chalk.italic.cyanBright.bold(
        `\nWithdrawal of $${account} successful. Remaining balance: $${this.balance}\n`
      ));
    } else {
      console.log(chalk.italic.redBright.bold("\nInsufficient balance.!\n"));
      //console.log(`Insufficient funds! Current balance: $${this.balance}`)
    }
  }
  deposit(account: number): void {
    if (account > 100) {
      account -= 1; // $1 fees charged if more than $100 is deposited
    }
    this.balance += account;
    console.log(chalk.italic.yellowBright.bold(
      `\nDeposit of $${account} successful. New balance: $${this.balance}\n`
    ));
  }
  checkBalance(): void {
    console.log(chalk.italic.redBright.bold(`\nCurrent balance: $${this.balance}\n`));
  }
}
// customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}
// Create bank accounts
let accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 750),
  new BankAccount(1003, 1000),
];
// create customers
let customers: Customer[] = [
    new Customer('Muhammad', 'Ali', 'Male', 25, 9876543210, accounts[0]),
    new Customer('Hamza', 'khan', 'Male', 30, 9876543211, accounts[1]),
    new Customer('Asma', 'Bano', 'Female', 28, 9876543212, accounts[2])
]

// Function to interface with bank account

async function service() {
    do{
       const accountNumberInput = await inquirer.prompt({
        name: "accountNumber",
        type: "number",
        message: chalk.italic.cyanBright.bold("\nEnter your account number:\n")
       })

       const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
       if(customer){
        console.log(chalk.italic.greenBright.bold(`\nWelcome ${customer.firstName} ${customer.lastName}\n`))
        const ans = await inquirer.prompt({
            name: "action",
            type: "list",
            message: chalk.italic.yellow.bold("\nSelect an option:\n"),
            choices: [
                chalk.italic.cyan.bold("Deposit"),
                chalk.italic.blue.bold("Withdraw"),
                chalk.italic.magenta.bold("Check Balance"), 
                chalk.italic.red.bold("Exit")
            ]
        });
        switch(ans.action){
             case chalk.italic.cyan.bold("Deposit"):
                const depositAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: chalk.italic.blueBright.bold("\nEnter the amount you want to deposit:\n")
        })
        customer.account.deposit(depositAmount.amount);
        break;
        case chalk.italic.blue.bold("Withdraw"):
                const withdrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: chalk.italic.greenBright.bold("\nEnter the amount you want to withdraw:\n")
        })
        customer.account.withdraw(withdrawAmount.amount);
        break;
        case chalk.italic.magenta.bold("Check Balance"):
            customer.account.checkBalance();
            break;
        case chalk.italic.red.bold("Exit"):
            console.log(chalk.italic.cyanBright("\nExiting bank program...\n"))
            console.log(chalk.italic.yellow.bold("\n\tThank you for using our bank services. Have a great day!\n\t"));
            return;
        }
      }
      else{
        console.log(chalk.italic.red.bold("\nInvalid account number. Please try again...\n"));
      }
    }while(true)
}
service();