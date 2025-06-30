//your code here
const userImage = document.getElementById('userImage');
const userName = document.getElementById('userName');
const additionalInfo = document.getElementById('additionalInfo');
const buttons = document.querySelectorAll('button[data-attr]');
const getUserBtn = document.getElementById('getUser');

let currentUser = {}; 

function fetchUser() {
  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];

      currentUser = {
        fullName: `${user.name.first} ${user.name.last}`,
        image: user.picture.large,
        age: user.dob.age,
        email: user.email,
        phone: user.phone
      };

      displayUser();
    })
    .catch(err => {
      console.error('Failed to fetch user', err);
      additionalInfo.textContent = 'Failed to load user.';
    });
}


function displayUser() {
  userImage.src = currentUser.image;
  userName.textContent = currentUser.fullName;
  additionalInfo.textContent = 'Click a button to show user info';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-attr');
    if (currentUser[type]) {
      additionalInfo.textContent = currentUser[type];
    } else {
      additionalInfo.textContent = 'Info not available';
    }
  });
});

getUserBtn.addEventListener('click', fetchUser);

window.onload = fetchUser;
