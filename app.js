const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//function to begin inquirer input
avengersAssemble();
const teamMembers= [];

function avengersAssemble () {
    console.log("---------------");
    console.log("It's time to assemble...your team members. Fill out the questions below.")

    inquirer
        .prompt ([
            {
                type: "list",
                name: "role",
                message: "Select a role for this team member.",
                choices: ["Manager", "Engineer", "Intern", "No Further Members"]
            }
        ])
        .then(input => {
            switch (input.role) {
                case "Manager" :
                    createManager();
                    break;
                
                case "Engineer":
                    createEngineer();
                    break;

                case "Intern":
                    createIntern();
                    break;
                
                case "No Further Members":
                    render(teamTotal)
                    writeHTML();
            }
        })
}

function createManager(){
    inquirer.prompt([
        {
            type: "input",
            name:"name",
            message: "What is this Manager's name?",
            validate: catchEmpty

        },
        {
            type: "input",
            name: "email",
            message: "Enter their work email address",
            validate: emailValidate
        },
    ])
}

function catchEmpty (input){
    if (input === ""){
        return "Please enter requested information"
    } 
    else return true
}
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
