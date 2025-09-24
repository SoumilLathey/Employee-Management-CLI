const readline = require('readline');

// The array to store employee data
const employees = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Displays the main menu and prompts the user for an action.
 */
function displayMenu() {
  console.log('\n=== Employee Management System ===');
  console.log('1. Add a new employee');
  console.log('2. List all employees');
  console.log('3. Remove an employee by ID');
  console.log('4. Exit');
  rl.question('Please choose an option: ', (option) => {
    handleOption(option.trim());
  });
}

/**
 * Handles the user's menu option.
 * @param {string} option - The user's input.
 */
function handleOption(option) {
  switch (option) {
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
      console.log('Exiting the application. Goodbye! 👋');
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      displayMenu();
      break;
  }
}

/**
 * Prompts the user for employee details and adds a new employee.
 */
function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter employee ID: ', (id) => {
      // Check if an employee with the same ID already exists
      if (employees.some(emp => emp.id === id)) {
        console.log('An employee with this ID already exists. Please use a unique ID.');
        addEmployee(); // Re-prompt to add another employee
      } else {
        const newEmployee = { name, id };
        employees.push(newEmployee);
        console.log(`✅ Employee "${name}" with ID "${id}" added successfully!`);
        displayMenu();
      }
    });
  });
}

/**
 * Lists all employees currently in the array.
 */
function listEmployees() {
  console.log('\n=== Current Employees ===');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach(emp => {
      console.log(`- ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  displayMenu();
}

/**
 * Prompts for an employee ID and removes the corresponding employee.
 */
function removeEmployee() {
  rl.question('Enter the ID of the employee to remove: ', (id) => {
    const initialLength = employees.length;
    // Filter the array to create a new one without the specified employee
    const newEmployees = employees.filter(emp => emp.id !== id);
    if (newEmployees.length < initialLength) {
      // Update the main array
      employees.length = 0; // Clear the original array
      employees.push(...newEmployees); // Push the new content
      console.log(`🗑️ Employee with ID "${id}" removed successfully.`);
    } else {
      console.log('Employee not found. No one was removed.');
    }
    displayMenu();
  });
}

// Start the application
displayMenu();