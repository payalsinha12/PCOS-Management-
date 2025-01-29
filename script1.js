document.getElementById('submit-btn').addEventListener('click', function () {
  
  const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(input => input.value);

  const missedPeriods = symptoms.includes("Missed periods, irregular periods, or very light periods");
  const acneOrOilySkin = symptoms.includes("Acne or oily skin");
  const largeOvaries = symptoms.includes("Ovaries that are large or have many cysts");
  const baldness = symptoms.includes("Male-pattern baldness or thinning hair");
  const infertility = symptoms.includes("Infertility");

  
  let isPCOS = false;

 
  if (missedPeriods && (acneOrOilySkin && symptoms.length === 2)) {
    isPCOS = false;
  }

  
  if (largeOvaries && baldness && infertility && (symptoms.length === 4 || symptoms.length === 5)) {
    isPCOS = true;
  }

 
  if ((largeOvaries || baldness || infertility) && symptoms.length > 1) {
    isPCOS = true;
  }

  
  let resultsMessage = '<h3>Diagnosis Result:</h3>';
  if (isPCOS) {
    resultsMessage += '<p>Based on the selected symptoms, it seems you may have PCOS. Please consult a healthcare professional for a thorough diagnosis and advice.</p>';
  } else {
    resultsMessage += '<p>No significant PCOS symptoms were selected. It is recommended to consult a healthcare professional for further evaluation.</p>';
  }

  
 
  document.getElementById('diagnosis-results').innerHTML = resultsMessage;
});

document.getElementById('submit-btn').addEventListener('click', function () {

  const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(input => input.value);

  const missedPeriods = symptoms.includes("Missed periods, irregular periods, or very light periods");
  const acneOrOilySkin = symptoms.includes("Acne or oily skin");
  const largeOvaries = symptoms.includes("Ovaries that are large or have many cysts");
  const baldness = symptoms.includes("Male-pattern baldness or thinning hair");
  const infertility = symptoms.includes("Infertility");


  let isPCOS = false;


  if (missedPeriods && (acneOrOilySkin && symptoms.length === 2)) {
      isPCOS = false;
  }


  if (largeOvaries && baldness && infertility && (symptoms.length === 4 || symptoms.length === 5)) {
      isPCOS = true;
  }


  if ((largeOvaries || baldness || infertility) && symptoms.length > 1) {
      isPCOS = true;
  }


  let resultsMessage = '<h3>Diagnosis Result:</h3>';
  if (isPCOS) {
      resultsMessage += '<p>Based on the selected symptoms, it seems you may have PCOS. Please consult a healthcare professional for a thorough diagnosis and advice.</p>';
  } else {
      resultsMessage += '<p>No significant PCOS symptoms were selected. It is recommended to consult a healthcare professional for further evaluation.</p>';
  }



  document.getElementById('diagnosis-results').innerHTML = resultsMessage;
});

document.getElementById('upload-submit-btn').addEventListener('click', () => {
  const fileInput = document.getElementById('sonography-file');
  const file = fileInput.files[0];

  if (!file) {
      alert('Please select a file to upload!');
      return;
  }

  console.log("Selected File:", file);

  const formData = new FormData();
  formData.append('file', file);

  console.log("FormData Content:", formData.get('file'));

  fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
      headers: {
          "Accept": "application/json"
      }
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(err => {throw new Error(err.error || "Upload failed")});
      }
      return response.json();
  })
  .then(data => {
      console.log("Server Response:", data);
      if (data.error) {
          alert(`Error: ${data.error}`);
      } else {
        let predictionMessage;
    if (data.probability < 0.6) {
        predictionMessage = "Less likely to have PCOS";
    } else {
        predictionMessage = "More likely to have PCOS";
    }

    document.getElementById('diagnosis-results').innerHTML = `
        <h3>Prediction Result:</h3>
        <p>${predictionMessage} (Probability: ${data.probability.toFixed(2)})</p>
    `; // Changed text

      
      }
  })
  .catch(error => {
      console.error('Fetch Error:', error);
      alert('An error occurred during the upload: ' + error.message);
  });
});
// Function to display the sonography result
function displaySonographyResult(message, success) {
  const resultDiv = document.getElementById('sonography-results');
  resultDiv.innerHTML = `<h3>Sonography Report Result:</h3><p>${message}</p>`;

  if (success) {
    resultDiv.style.backgroundColor = '#e6ffe6'; // Light green for success
  } else {
    resultDiv.style.backgroundColor = '#ffcccc'; // Light red for error
  }

  resultDiv.style.display = 'block'; // Show the result box
}