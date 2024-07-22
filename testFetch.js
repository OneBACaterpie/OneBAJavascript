fetch('https://www.mcgi.state.mi.us/ws_csstp/gis_services.svc/rest/geocodeAddress/?a={ADDRESS}&ma={MATCHALL}&tk={TOKEN}', {
	method:'GET',
	headers: {
		'ADDRESS':'4651 Sequoia Trl, Okemos, 48864'
		'MATCHALL':'false'
		'TOKEN':'%7bTOKEN%7d'
		}
	)
	.then(response => response.json())
	.then(data =>  {
		console.log(data)
		}
	);
