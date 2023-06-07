const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express();

// Set the view engine as EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Render the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle the form submission
app.post('/predict', (req, res) => {
  const userInput = req.body;

  // Execute the Python script with user input as arguments
  exec(`python loan_prediction.py ${userInput.ApplicantIncome} ${userInput.CoapplicantIncome} ${userInput.LoanAmount} ${userInput.Loan_Amount_Term} ${userInput.Credit_History} ${userInput.Gender_Male} ${userInput.Married_Yes} ${userInput.Dependents_1} ${userInput.Dependents_2} ${userInput.Dependents_3plus} ${userInput.Education_Not_Graduate} ${userInput.Self_Employed_Yes} ${userInput.Property_Area_Semiurban} ${userInput.Property_Area_Urban}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    
    // Parse the predicted output
    const prediction = parseInt(stdout.trim());

    // Render the result page with the prediction
    res.render('result', { prediction });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
