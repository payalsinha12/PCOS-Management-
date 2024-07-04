document.getElementById('submit-btn').addEventListener('click', function() {
    // Get all checked symptoms
    const symptoms = document.querySelectorAll('input[name="symptoms"]:checked');
  
    // Check for specific symptom selections
    const missedPeriods = isChecked('Missed periods, irregular periods, or very light periods');
    const acneOrOilySkin = isChecked('Acne or oily skin');
    const largeOvaries = isChecked('Ovaries that are large or have many cysts');
    const baldness = isChecked('Male-pattern baldness or thinning hair');
    const infertility = isChecked('Infertility');
  
    // Determine diagnosis based on conditions
    let isPCOS = false;
  
    // Rule 1: No PCOS if Missed periods + Acne or Oily skin
    if (missedPeriods && (acneOrOilySkin || symptoms.length === 2)) {
      isPCOS = false;
    }
    
    // Rule 2: PCOS if all selected
    if (largeOvaries && baldness && infertility && (symptoms.length === 4 || symptoms.length === 5)) {
      isPCOS = true;
    }
  
    // Rule 3: PCOS if either Large Ovaries or Baldness or Infertility is selected with any other symptom
    if ((largeOvaries || baldness || infertility) && symptoms.length > 1) {
      isPCOS = true;
    }
  
    // Prepare the results message
    let resultsMessage = '<h3>Diagnosis Result:</h3>';
    if (isPCOS) {
      resultsMessage += '<p>Based on the selected symptoms, it seems you may have PCOS. Please consult a healthcare professional for a thorough diagnosis and advice.</p>';
    } else {
      resultsMessage += '<p>No significant PCOS symptoms were selected. It is recommended to consult a healthcare professional for further evaluation.</p>';
    }
  
    // Display results
    document.getElementById('diagnosis-results').innerHTML = resultsMessage;
  });
  
  // Function to check if a specific symptom is selected
  function isChecked(symptom) {
    const selectedSymptom = document.querySelector('input[name="symptoms"][value="' + symptom + '"]');
    return selectedSymptom.checked;
  }
  