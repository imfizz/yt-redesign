
hasAccount();

function hasAccount(){

    if(localStorage.getItem('givenName') === null) {

        document.querySelector("#user-profile-name").addEventListener('click', function(){
            
            const mainContainer = document.querySelector("#main-container");

            const popUpMessage = `
                <label for="user-gname">First Name</label>
                <input type="text" placeholder="Type here .." id="user-gname"/>
                <label for="user-password">Last Name</label>
                <input type="text" placeholder="Type here .." id="user-password"/>
                <button type="submit">Create Account</button>
            `;
            
            
            document.querySelector("#user-profile-name").className = "disable-signup";

            const form = document.createElement("form");
            form.className = "sign-up-form";
            form.innerHTML = popUpMessage;

            mainContainer.appendChild(form);

            userData(form);
        });


        function userData(form){
            document.querySelector(".sign-up-form").addEventListener("submit", function(e){
                e.preventDefault();
        
                const gname = document.querySelector("#user-gname").value;                
                const password = document.querySelector("#user-password").value;
                
                let givenName, userpass;

                if(localStorage.getItem('givenName') === null && localStorage.getItem('userpass') === null){
                    const logout = document.querySelector('#sidebar-footer');
                    
                    givenName = [];
                    userpass = [];
                    
                } else {
                    givenName = JSON.parse(localStorage.getItem('givenName'));
                    userpass = JSON.parse(localStorage.getItem('userpass'));
                }
                
                givenName.push(gname); 
                userpass.push(password);
        
                localStorage.setItem('givenName', JSON.stringify(givenName));
                localStorage.setItem('userpass', JSON.stringify(userpass));
        
                
                form.style.display = "none";
        
                setDataToElement(gname, password);

                givenName.forEach((name) => {
                    console.log(name);
                });
            });
        }


    } else {
        const myUsername = JSON.parse(localStorage.getItem('givenName'));
        const mySurname = JSON.parse(localStorage.getItem('userpass'));
        setDataToElement(myUsername, mySurname);
    }





    function setDataToElement(name, surname){
        
        const setMyName = document.querySelector("#user-profile-name");
        const userName = document.querySelector("#user-name"); 
        const userLogout = document.querySelector("#sidebar-footer");


        setMyName.innerHTML = `${name} ${surname}`;
        setMyName.style.textTransform = "capitalize";

        userName.innerHTML = ", " + name; 
        userName.style.textTransform = "capitalize"; 

        userLogout.style.display = "block";
    }

}


document.querySelector("#user-logout").addEventListener('click', function(){
    localStorage.removeItem('givenName'); 
    localStorage.removeItem('userpass'); 
    hasAccount();
    
    const setMyName = document.querySelector("#user-profile-name").className = "";
    
    window.location.reload(true); 
});

