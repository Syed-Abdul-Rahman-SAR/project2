const token = localStorage.getItem("token");
if(token){
    window.location.href = "dashboard.html";
}else{
    window.location.href = "login.html";
}