const ventsContainer = document.querySelector('#admin');

window.onload = function() {
  myFunction();
};

const baseurl = 'https://venthere.onrender.com'

function myFunction() {
  fetch(`${baseurl}/api/vents/admin`)
    .then(response => response.json())
    .then(data => {
      ventsContainer.innerHTML = ''; // Clear previous vents

      data.forEach(vent => {
        const ventElement = document.createElement('div');
        ventElement.classList.add('singleVent');
        ventElement.innerHTML = `
          <p class="vent_heading">Name: ${vent.name}</p>
          <p>${vent.vent}</p> 
          <div class="buttonsContainer">
          <button id="approve" class="approve" onclick="updateVent('${vent._id}')">Approve</button>
          <button id="approve" class="remove" onclick="deleteVent('${vent._id}')">Delete</button>
          </div>
        `;
        ventsContainer.appendChild(ventElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function updateVent(ventId) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `${baseurl}/api/vents/admin/${ventId}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Vent updated successfully:', xhr.responseText);
      // You can perform any additional actions after the vent is updated
    } else {
      console.error('Error:', xhr.status);
    }
  };
  
  let updatedVent = {
    id: ventId // Send only the vent.id in the request body
  };
  
  xhr.send(JSON.stringify(updatedVent));
  refreshPage()
  
}

function deleteVent(ventId) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `${baseurl}/api/vents/admin/${ventId}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Vent updated successfully:', xhr.responseText);
      // You can perform any additional actions after the vent is updated
    } else {
      console.error('Error:', xhr.status);
    }
  };
  
  let updatedVent = {
    id: ventId // Send only the vent.id in the request body
  };
  
  xhr.send(JSON.stringify(updatedVent));
  refreshPage()
}


function refreshPage() {
  location.reload();
}
