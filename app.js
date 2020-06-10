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

// ask the questions about a user; DONE
//     write a function that ONLY asks questions about users
//     save all the answer to some variable
// if they choose exit:
//    generate html
// if the choose something else
//    run the funtion that ONLY asks questions about users


async function userPrompt(prompt, optionsPrompt) {
    inquirer.prompt(optionsPrompt)
    
    const answer = await inquirer.prompt([...prompt, optionsPrompt]);
    employees.push(answer)

    console.log("Please first add a manager and then the rest of the team");


    switch (answer.option) {
        case 'exitApp':
            console.log('app exited');
            break;
        case 'plusManager':
            // let manager = await userPrompt(managerPrompt);
            ids.push(Number(manager.id));
            employees.push(new Manager(...Object.values(manager)));
            break;
        case 'plusIntern':
            // let intern = await userPrompt(internPrompt);
            ids.push(Number(intern.id));
            employees.push(new Intern(...Object.values(intern)));
            break;
        case 'plusEngineer':
            // let engineer = await userPrompt(engineerPrompt);
            ids.push(Number(engineer.id));
            employees.push(new Engineer(...Object.values(engineer)));
            break;
        case 'createHTML':
            createRoster(employees);
            break;
        default:
            console.log('no exit');
    }
};

const employees = [];
async function createRoster() {
    try {
        const htmlBuild = render(employees);
        console.log(employees);
        await writeFileAsync(outputPath, htmlBuild);
        console.log("Done.");
} catch(err) {
    console.log(err);
}};
userPrompt();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```







//How many people are in your team?
//Is the first person a manager, intern or engineer?
//If manager, prompt with manager questions object
//If intern, prompt with intern questions object
//If engineer, prompt with engineer questions object

//Store user answers in array of objects
//data in html equal to a var

//if array problems, look into .join


