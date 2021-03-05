$(document).ready(function() {

  $("#query-form").submit(function(event) { performSearch(event); });
});


var pat,flag=0;
function formatSearchResults(jsonResults) {

  var jsonObject = jsonResults;


  
   

    $("#search-results-heading").text("Search Results");
    var formatedText = "";

    jsonObject.Countries.forEach(
      function(item, index) {

        if(item.Country.toLowerCase()==pat.toLowerCase()){
        var thumbnail = item.NewConfirmed;
        
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

function performSearch(event) {

  var request;

  event.preventDefault();

  if (request) {
      request.abort();
  }
  var $form = $(this);

  setFormDisabledProps(true);

  $("#search-results-heading").text("Searching ...");
  $("#results").text("");

  request = $.ajax({
      url:"https://api.covid19api.com/summary",
      type: "GET",
  });

pat=$("#ingredients").val();

  request.done(function (response,textStatus, jqXHR){
    formatSearchResults(response);
    console.log(pat)
  });

  request.fail(function (jqXHR, textStatus, errorThrown){
      $("#search-results-heading").text("Sorry We Unable to fetch Covid Data.Try again.");
      $("#results").text("");
  });

  request.always(function () {
    
      setFormDisabledProps(false);
  });

}

function resetResults() {
  $("#search-results-heading").text("");
  $("#results").text("");
  flag=0;
}


function sanitizeInputs() {
  var str = $("#ingredients").val();
  str = str.replace(/[^a-zA-Z 0-9,]/gim, "");
  str = str.trim();
  $("#ingredients").val(str);
}


function setFormDisabledProps(statusToSet) {
    document.getElementById("ingredients").disabled = statusToSet;
    document.getElementById("resetButton").disabled = statusToSet;
    document.getElementById("searchButton").disabled = statusToSet;
}
function setNotFoundMessages() {
  $("#search-results-heading").text("Dont Fun With it.Please Enter Correct Country Name e.g-India");
  $("#results").text("");
}
