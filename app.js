const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const employees = [];
const ids = [];

const render = require("./lib/htmlRenderer");


const managerPrompt = [
    {
        type: "input",
        message: "What is the manager's first and last name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the manager's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "office"
    }
];

const engineerPrompt = [
    {
        type: "input",
        message: "What is the engineer's first and last name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the engineer's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the engineer's email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the engineer's github username?",
        name: "github"
    }
];

const internPrompt = [
    {
        type: "input",
        message: "What is the intern's first and last name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the intern's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the intern's email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the intern's school named?",
        name: "school"
    }
];

const optionsPrompt = 
    {
        type: "list",
        message: "Choose an option to do next.",
        name: "option",
        choices: [
            {
                name: "Add manager to the team",
                value: "plusManager",
                short: "Add Manager"
            },

            {
                name: "Add engineer to the team",
                value: "plusEngineer",
                short: "Add Engineer"
            },

            {
                name: "Add intern to the team",
                value: "plusIntern",
                short: "Add Intern"
            },

            {
                name: "Complete page and generate HTML",
                value: "createHTML",
                short: "Create HTML"
            },            

            {
                name: "Exit without finishing",
                value: "exitApp",
                short: "Exit"
            },
        ]
    };

function chooseOption(manager, engineer, intern, options) {
    inquirer.prompt(options).then(function (answer) {
        console.log(answer.option);
        switch (answer.option) {
            case "plusManager":
                userPrompt(manager, "manager");
                break;
            case "plusEngineer":
                userPrompt(engineer, "engineer");
                break;
            case "plusIntern":
                userPrompt(intern, "engineer");
                break;
            case "createHTML":
                console.log(employees);
                createRoster(employees);
                break;
            case "exitApp":
                console.log("no exit");
        }
    });
}

chooseOption(managerPrompt, engineerPrompt, internPrompt, optionsPrompt);

function userPrompt(chosenPrompt, promptChecker) {
    inquirer.prompt(chosenPrompt).then(function (answers) {

        ids.push(Number(answers.id));

        switch (promptChecker) {
            case "manager":
                employees.push(new Manager(...Object.values(answers)));
                break;
            case "engineer":
                employees.push(new Engineer(...Object.values(answers)));
                break;
            case "intern":
                employees.push(new Intern(...Object.values(answers)));
                break;
            default:
                return console.log("something went wrong...");
        }
    })
    .then(function () {
        chooseOption(managerPrompt, engineerPrompt, internPrompt, optionsPrompt);
    })
};


async function createRoster() {
    try {
        const htmlBuild = render(employees);
        console.log(employees);
        await writeFileAsync(outputPath, htmlBuild);
        console.log("Done.");
} catch(err) {
    console.log(err);
}};



