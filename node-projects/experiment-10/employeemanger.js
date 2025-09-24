const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employees = [];

function showMenu() {
    console.log('\n=== Employee Management System ===');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
    rl.question('Choose an option (1-4): ', handleMenu);
}

function handleMenu(choice) {
    switch (choice.trim()) {
        case '1':
            addEmployee();
            break;
        case '2':
            listEmployees();
            break;
        case '3':
            removeEmployee();
            break;
        case '4':
            console.log('Exiting...');
            rl.close();
            break;
        default:
            console.log('Invalid choice!');
            showMenu();
    }
}

function addEmployee() {
    rl.question('Enter Employee Name: ', (name) => {
        rl.question('Enter Employee ID: ', (id) => {
            employees.push({ name, id });
            console.log(`Employee ${name} added successfully.`);
            showMenu();
        });
    });
}

function listEmployees() {
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach((emp, i) => 
            console.log(`${i + 1}. ${emp.name} (ID: ${emp.id})`)
        );
    }
    showMenu();
}

function removeEmployee() {
    rl.question('Enter Employee ID to remove: ', (id) => {
        const index = employees.findIndex(emp => emp.id === id);
        if (index === -1) {
            console.log(`Employee with ID ${id} not found.`);
        } else {
            const removed = employees.splice(index, 1)[0];
            console.log(`Employee ${removed.name} removed successfully.`);
        }
        showMenu();
    });
}

// Start the app
showMenu();
