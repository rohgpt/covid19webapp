$(document).ready(function() {
  // add an event listener (performSearch) to the form
  $("#query-form").submit(function(event) { performSearch(event); });
});


var pat,flag=0;
function formatSearchResults(jsonResults) {

  var jsonObject = jsonResults;
 
  //var siteCount = 0;

  
   

    $("#search-results-heading").text("Search Results");
    var formatedText = "";

    jsonObject.Countries.forEach(
      function(item, index) {

        //console.log("hello"+data);
        
        if(item.Country.toLowerCase()==pat.toLowerCase()){
        var thumbnail = item.NewConfirmed;
        

        //const href = item.href;

        //formatedText += "<div class='dish-image-div'><a " + " href='" + href + "' target='_blank'><img class='dish-image' width='80' src='" + thumbnail + "' alt='recipe picture, link to recipe page'></a></div>";
        //formatedText += "<div " + "class='dish-title-div'><a href='" + href + "' target='_blank'>" + item.title + "</a></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>TotalConfirmed: " + item.TotalConfirmed + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewDeaths: " + item.NewDeaths + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewConfirmed: " + item.NewConfirmed + "<h3></div>";
       formatedText += "<div class='dish-ingredients-div'><h3>NewRecovered: " + item.NewRecovered + "<h3></div>";
       flag=1;
        return;
      }
    }
    );

$("#results").html(formatedText);
  if(!flag){setNotFoundMessages();}

}

// This functions handles sending off the search request as well as
// error and success handling when the request calls back

function performSearch(event) {

  // Variable to hold request
  var request;

  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
      request.abort();
  }
  // setup some local variables
  var $form = $(this);

  // disable the inputs and buttons for the duration of the request.
  setFormDisabledProps(true);

  $("#search-results-heading").text("Searching ...");
  $("#results").text("");

  // Send the request

  request = $.ajax({
      url:"https://api.covid19api.com/summary",
      type: "GET",
     // data: { i: , q: $("#contains").val()}
  });

pat=$("#ingredients").val();

  // Callback handler for success

  request.done(function (response,textStatus, jqXHR){
    formatSearchResults(response);
    console.log(pat)
  });

  // Callback handler for failure

  request.fail(function (jqXHR, textStatus, errorThrown){
      $("#search-results-heading").text("Sorry We Unable to fetch Covid Data.Try again.");
      $("#results").text("");
  });

  // Callback handler that will be called in any case

  request.always(function () {
      // Reenable the inputs
      setFormDisabledProps(false);
  });

}

// This function clears the search results and the heading "Search Results"

function resetResults() {
  $("#search-results-heading").text("");
  $("#results").text("");
  flag=0;
}

// This function checks the user input fields for any unacceptable characters
// and removes them if found

function sanitizeInputs() {
  var str = $("#ingredients").val();
  str = str.replace(/[^a-zA-Z 0-9,]/gim, "");
  str = str.trim();
  $("#ingredients").val(str);
}

// This function disables the text fields and the two buttons

function setFormDisabledProps(statusToSet) {
    document.getElementById("ingredients").disabled = statusToSet;
    document.getElementById("resetButton").disabled = statusToSet;
    document.getElementById("searchButton").disabled = statusToSet;
}
function setNotFoundMessages() {
  $("#search-results-heading").text("Dont Fun With it.Please Enter Correct Country Name e.g-India");
  $("#results").text("");
}

// This function sets the result heading to "no recipes found" and clear the
// existing search results, if there are any
