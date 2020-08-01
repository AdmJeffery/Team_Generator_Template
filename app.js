const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




//function to begin inquirer input

const teamMembers= [];
const givenId = {};


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
                    render(teamMembers)
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
            type:"input",
            name: "id",
            message: "Enter their employee id",
            validate: checkId

        },
        {
            type: "input",
            name: "email",
            message: "Enter their work email address",
            validate: emailValidate
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is this manager's office number?",
            validate: catchEmpty
        }
    ])
    .then (input => {
        
        let manager = new Manager (input.name, input.id, input.email, input.officeNumber);
        teamMembers.push(manager)
        avengersAssemble()
    })
}

function createEngineer (){
    inquirer.prompt ([
        {
            type: "input",
            name:"name",
            message: "What is this Engineer's name?",
            validate: catchEmpty 
        },
        {
            type:"input",
            name: "id",
            message: "Enter their employee id",
            validate: checkId

        },
        {
            type: "input",
            name: "email",
            message: "Enter their work email address",
            validate: emailValidate
        },
        {
            type: "input",
            name: "github",
            message:"What is their GitHub username?",
            validate: catchEmpty
        }

    ])
    .then(input => {
        
        let engineer = new Engineer (input.name, input.id, input.email, input.github)
        teamMembers.push(engineer)
        avengersAssemble()
    })
}

function createIntern(){
    inquirer.prompt ([
        {
            type: "input",
            name:"name",
            message: "What is this Intern's name?",
            validate: catchEmpty  
        },
        {
            type:"input",
            name: "id",
            message: "Enter their employee id",
            validate: checkId

        },
        {
            type: "input",
            name: "email",
            message: "Enter their work email address",
            validate: emailValidate
        },
        {
            type: "input",
            name: "school",
            message: "What is their alma mater?",
            validate: catchEmpty
        }
    ])
    .then(input => {
        
        let intern = new Intern (input.name, input.id, input.email, input.school)
        teamMembers.push(intern)
        avengersAssemble()
    })
}
function catchEmpty (input){
    if (input === ""){
        return "Please enter requested information"
    } 
    else return true
}

function emailValidate (email) {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    if (valid){
        return true
    }
    else {
        return "Please enter a valid email"
    }
}

function checkId (id) {
    if (givenId[id] || id === "") {
        return "Please enter a valid employee id"
    }
    else {
        givenId[id] = true
        return true
    }
}

function writeHTML() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

    console.log("Check the output folder to view your team html.")
}
avengersAssemble();