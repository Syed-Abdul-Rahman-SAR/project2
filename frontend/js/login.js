document.getElementById('loginForm').addEventListener('submit',async function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');
    try{
        const res = await fetch('http://localhost:5000/api/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {email,password})
        });
        const data = await res.json();
        if(res.ok){
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Login successful!'
            localStorage.setItem('token',data.token);
            window.location.href = 'dashboard.html';
        }else{
            messageDiv.style.color = 'red';
            messageDiv.textContent = data.message || 'Login failed';
        }
    } catch(err){
        messageDiv.textContent = 'Error: Could not connect to server.';
    }
});