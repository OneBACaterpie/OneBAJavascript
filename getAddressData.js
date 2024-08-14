async function getData() {
  const displayRep = document.getElementById("rep");
  const url = "https://www.mcgi.state.mi.us/ws_csstp/gis_services.svc/rest/geocodeAddress/?a=105%20West%20River%20Street%20Deerfield%2049238&ma=false&tk=%7bTOKEN%7d";
  const myData = await response.json();
  const myObj = await JSON.parse(myData);
  console.log(myObj);
}
