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
