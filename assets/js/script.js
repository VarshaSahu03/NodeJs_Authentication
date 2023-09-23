//lucifer.santosh123@gmail;.com

//Setup and start animation! 
var typed = new Typed('#element', {
    strings: ['Web developer', 'Java developer','Python developer','Web designer'],
    typeSpeed: 50,
  });

  $("#download").click(function (e) {
    $.ajax({
     type: "GET",
     url: "/downloadPDF",
     xhrFields: {
      // specify response type as "blob" to handle objects
      responseType: "blob",
     },
     success: function (data) {
   
      // creating a hidden <a> tag
      var a = document.createElement("a");
   
      // creating a reference to the file
      var url = window.URL.createObjectURL(data);
   
      // setting anchor tag's href attribute to the blob's URL
      a.href = url;
   
      // setting anchor tag's download attribute to the filename
      a.download = "Resume.pdf";
      document.body.append(a);
   
      // click on the <a> tag
      a.click();
   
      // after clicking it, remove it from the DOM
      a.remove();
      // release an existing object URL which was previously 
      // created by calling URL.createObjectURL()
      // once we have finished using an object URL, let the
      // browser know not to keep the reference to the file any longer.
      window.URL.revokeObjectURL(url);
     },
     error: function (result) {
      alert("error");
     },
    });
   });


   function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


//   window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("navbar");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }