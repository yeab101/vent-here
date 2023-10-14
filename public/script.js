let ventsContainer = document.querySelector('#vents');

let colors = ['4cb5f5', 'ea6a47', 'dbae58', '202020', '6ab187', 'c3d2cc', 'd32d41'];


window.onload = function () {
  // Your code here

  myFunction();
};
const baseurl = 'http://localhost:3000'

function myFunction() {
  fetch(`${baseurl}/api/vents`)
    .then(response => response.json())
    .then(data => {
      ventsContainer.innerHTML = ''; // Clear previous vents

      data.forEach(vent => {
        let randomIndex = Math.floor(Math.random() * colors.length);
        let randomColor = colors[randomIndex]
        let ventElement = document.createElement('div');
        ventElement.classList.add('singleVent');
        ventElement.innerHTML = `
            <div class="avatar_container"> 
              <img src="https://ui-avatars.com/api/?name=${vent.name}&background=${randomColor}&color=fff" class="avatar" />
              <p class="vent_heading"> ${vent.name}</p>
            </div>
            <p> ${vent.vent}</p> 
        `;
        ventsContainer.appendChild(ventElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


//new post 
document.getElementById("newVent").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form
  var name = document.getElementById("name").value;
  var vent = document.getElementById("vent").value;

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", `${baseurl}/api/vents`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Set up the data to be sent
  var data = JSON.stringify({ name: name, vent: vent });

  // Send the request
  xhr.send(data);

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Request sent successfully!");
      // Do something with the response if needed
    } else {
      console.log("Request failed. Status: " + xhr.status);
      // Handle the error if needed
    }
  };
});
