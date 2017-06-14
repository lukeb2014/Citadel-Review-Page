window.onload = function() {
    initModal();
    updateLinks();
    runStuff();
}
function runStuff() {
    var entireString = window.location.search.substr(1);
    var params = entireString.split("=");
    
    var good = params[1].split("&")[0];
    // we need to turn %20 into ' '
    var nS = good.replace("%20", " ");
    
    document.getElementById("user").value = nS;
    
    document.getElementById("user_email").value = params[2].split("&")[0];
    
    document.getElementById("user_phone").value = decodeURIComponent(params[3].split("&")[0]);
}
function recommend(recommended) {
    console.log("hi");
    if (recommended) {
        document.getElementById("user_recommended").value = "1";
        document.getElementById("positive_recommend").style.border = "2px solid #e0e502";
        document.getElementById("negative_recommend").style.border = "";
        document.getElementById("user_comments").hidden = true;
        document.getElementById("feedback_text").hidden = true;
    }
    else {
        document.getElementById("user_recommended").value = "0";
        document.getElementById("user_comments").hidden = false;
        document.getElementById("feedback_text").hidden = false;
        document.getElementById("positive_recommend").style.border = "";
        document.getElementById("negative_recommend").style.border = "2px solid #e0e502";
    }
    document.getElementById("submit_button").hidden = "false";
}
function initModal() {
    // Get the modal
    var modal = document.getElementById("yes_modal");
    
    var modal_negative = document.getElementById("no_modal");
    
    // Get the button that opens the modal
    var btn = document.getElementById("positive_recommend");
    
    var btn_negative = document.getElementById("negative_recommend");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var span_ = document.getElementsByClassName("close")[1];
    
    // When the user clicks on the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }
    btn_negative.onclick = function () {
        modal_negative.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    span_.onclick = function () {
        modal_negative.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || event.target == modal_negative) {
            modal.style.display = "none";
            modal_negative.style.display = "none";
        }
    }
}
function updateLinks() {
    var y_elem = document.getElementById('y_review');
    var g_elem = document.getElementById('g_review');
    httpGetAsync("https://dentalsocialapp.herokuapp.com/citadel/GetLinks.php?key=rpm1", function(data) {
        var arr = JSON.parse(data);
        y_elem.href = arr.y;
        g_elem.href = arr.g;
    });
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}