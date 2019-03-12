// JavaScript source code
//login function
// get username and password from textbox and compare to json file
// if username == username from json file && password == password from json file, login = true


//to get the data from the server
var xhr = false;
var xhrTimeTable = false;
function makeRequest() {

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari	
        xhr = new XMLHttpRequest();
        xhrTimeTable = new XMLHttpRequest();
    }
    else {
	
        if (window.ActiveXObject) {
            // code for IE6, IE5
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                xhrTimetable = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }
    // if xhr contains a value
    if (xhr||xhrTimeTable) {
        // if there is a change of state calls function showContents
        xhr.onreadystatechange = showContents;
        xhrTimeTable.onreadystatechange = showTimeTableContents;
        // Uses the GET command to get the userPass.json file, true is 	// for asynchronous	
        xhr.open("GET", "http://itbwebapp.000webhostapp.com/js/userPass.json", true);  //get user password from json
        xhrTimeTable.open("GET", "http://itbwebapp.000webhostapp.com/js/timetable.json", true); //get timetable from timetable json
        // Sends the request	
        xhr.send(null);
        xhrTimeTable.send(null);
    }
    else {
        // put an error message into the body with id "loginBtn" 	// on HTML document
        document.getElementById("loginBtn").innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
    }
}
//show the data
function showContents() {
    // if readystate = 4 => complete
    if (xhr.readyState == 4) {
        // if status = 200 => ok
        if (xhr.status == 200) {
            // get the response, ie json file
            var jsondata = eval("("+xhr.responseText+")"); 		//retrieve result as an JavaScript object
            var user=jsondata.users;
            var output = '';
            
            for (var i = 0; i < user.length; i++) {
                if (document.getElementById("studentId").value == user[i].username && document.getElementById("studentPass").value == user[i].password) {
                    output = user[i].username;
                    window.location.href = "#timeTable";
                    document.getElementById("loginBtn").innerHTML = "Logout";
                }
            }
            if (output == '') {
                alert("Wrong username or password.");
                window.location.href="#home";
            }                
            
        }
        else {
            var output = "There was a problem with the request " + xhr.status;
        }
        // display the xml details in the "top right corner"
        document.getElementById("studentName").innerHTML = output;
    }
}

function logout() {    
        document.getElementById("loginBtn").innerHTML = "Login";        
        document.getElementById("studentName").innerHTML = "";
        document.getElementById("studentId").value = "";
        document.getElementById("studentPass").value = "";    
}

function timeTableValidation() {
    if (document.getElementById("loginBtn").innerHTML == 'Login' ){
        window.location.href = "#home";
        alert("Please login to view timetable");
    } else {        
        window.location.href = "#timeTable";
    }
    
}

//show time table contents**********************************************************************************
function showTimeTableContents() {
    // if readystate = 4 => complete
    if (xhrTimeTable.readyState == 4) {
        // if status = 200 => ok
        if (xhrTimeTable.status == 200) {
            // get the response, ie json file
            var jsondata = eval("(" + xhrTimeTable.responseText + ")"); 		//retrieve result as an JavaScript object
            var timetable = jsondata.timetable;
            var output2 = "";
            
            //loop through user timetable to check which user is logged in
            for (var i = 0; i < timetable.length; i++) {
                if (document.getElementById("studentId").value == timetable[i].username) {                    
                    //loop through monday timetable array             
                    output2 += "<tr>" + "<td><h2>Monday</h2></td>";
                    for (a = 0; a < timetable[i].monday.length; a++)
                        output2 += "<td>" + timetable[i].monday[a].time + "<br>" + timetable[i].monday[a].subject + "<br>" + timetable[i].monday[a].classroom + "</td>";
                    output2 += "</tr>";

                    output2 += "<tr>" + "<td><h2>Tuesday</h2></td>";
                    for (b = 0; b < timetable[i].tuesday.length; b++)
                        output2 += "<td>" + timetable[i].tuesday[b].time + "<br>" + timetable[i].tuesday[b].subject + "<br>" + timetable[i].tuesday[b].classroom + "</td>";
                    output2 += "</tr>";

                    output2 += "<tr>" + "<td><h2>Wednesday</h2></td>";
                    for (c = 0; c < timetable[i].wednesday.length; c++)
                        output2 += "<td>" + timetable[i].wednesday[c].time + "<br>" + timetable[i].wednesday[c].subject + "<br>" + timetable[i].wednesday[c].classroom + "</td>";
                    output2 += "</tr>";

                    output2 += "<tr>" + "<td><h2>Thursday</h2></td>";
                    for (d = 0; d < timetable[i].thursday.length; d++)
                        output2 += "<td>" + timetable[i].thursday[d].time + "<br>" + timetable[i].thursday[d].subject + "<br>" + timetable[i].thursday[d].classroom + "</td>";
                    output2 += "</tr>";

                    output2 += "<tr>" + "<td><h2>Friday</h2></td>";
                    for (e = 0; e < timetable[i].friday.length; e++)
                        output2 += "<td>" + timetable[i].friday[e].time + "<br>" + timetable[i].friday[e].subject + "<br>" + timetable[i].friday[e].classroom + "</td>";
                    output2 += "</tr>";                                             
                                                       
                }
            }
        }
        else {
            var output2 = "There was a problem with the request " + xhrTimeTable.status;
        }
        // display the xml details in the table
        document.getElementById("timeTableArea").innerHTML = output2;
    }
}