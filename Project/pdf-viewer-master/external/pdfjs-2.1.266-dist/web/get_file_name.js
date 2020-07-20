var file_name_to_display = "1.pdf";

var xhr = new XMLHttpRequest()
url = 'http://localhost:8085/get_file_name'
xhr.open('GET', url);
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send()

//xhr repsonse handling
xhr.onload = function () {
    //alert("chal ja bhai")
    if (this.status == 200) {
        var temp = JSON.parse(this.responseText)
        console.log(temp.file_name);
        file_name_to_display = temp.file_name;
        console.log("file name mil gaya =>" + file_name_to_display);
        // alert(temp);
        immutables();
    } else if (this.status == 400) {
        alert(temp.error)
    } else {
        alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
    }
}