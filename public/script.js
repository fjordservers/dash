function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
