document.getElementById('cycleForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const lastPeriod = new Date(document.getElementById('lastPeriod').value);
  const cycleLength = parseInt(document.getElementById('cycleLength').value);
  
  const ovulationDay = new Date(lastPeriod);
  ovulationDay.setDate(ovulationDay.getDate() + Math.floor(cycleLength / 2));
  
  const fertileStart = new Date(ovulationDay);
  fertileStart.setDate(fertileStart.getDate() - 5);
  
  const fertileEnd = new Date(ovulationDay);
  fertileEnd.setDate(fertileEnd.getDate() + 1);
  
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
  
  document.getElementById('cycleResult').innerHTML = `
    <p>Ovulation Day: ${ovulationDay.toDateString()}</p>
    <p>Fertile Window: ${fertileStart.toDateString()} - ${fertileEnd.toDateString()}</p>
    <p>Next Period: ${nextPeriod.toDateString()}</p>
  `;
  
  generateCalendar(lastPeriod, cycleLength, ovulationDay, fertileStart, fertileEnd, nextPeriod);
  
  // Show the modal
  const modal = document.getElementById("resultModal");
  modal.style.display = "flex";
});

// Close the modal when the close button is clicked
document.querySelector('.close-button').addEventListener('click', function() {
  const modal = document.getElementById("resultModal");
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function(event) {
  const modal = document.getElementById("resultModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function generateCalendar(lastPeriod, cycleLength, ovulationDay, fertileStart, fertileEnd, nextPeriod) {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = ''; // Clear previous calendar

  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  for (let day = monthStart; day <= monthEnd; day.setDate(day.getDate() + 1)) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day.getDate();
    
    if (day.toDateString() === ovulationDay.toDateString()) {
      dayElement.style.backgroundColor = '#9370db';
      dayElement.style.color = 'white';
    } else if (day >= fertileStart && day <= fertileEnd) {
      dayElement.style.backgroundColor = '#87ceeb';
      dayElement.style.color = 'white';
    } else if (day.toDateString() === nextPeriod.toDateString()) {
      dayElement.style.backgroundColor = '#ffb6c1';
      dayElement.style.color = 'white';
    } else if (day >= lastPeriod && day < nextPeriod) {
      dayElement.style.backgroundColor = '#ff7f50';
      dayElement.style.color = 'white';
    }
    
    calendar.appendChild(dayElement);
  }
}
