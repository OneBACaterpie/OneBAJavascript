function jsonp(url, params, callback) {
    // Generate a unique callback name
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    // Construct the full URL with parameters
    let fullUrl = url + '?';
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            fullUrl += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
        }
    }

    // Append callback parameter
    fullUrl += 'callback=' + callbackName;

    // Create a script element
    const script = document.createElement('script');

    // Define the JSONP callback function
    window[callbackName] = function(data) {
        callback(data);
        // Clean up after ourselves
        document.body.removeChild(script);
        delete window[callbackName];
    };

    // Set the script source to the URL
    script.src = fullUrl;

    // Append the script to the document body
    document.body.appendChild(script);
}

// Usage example
const apiUrl = 'https://example.com/api/data';
const params = {
    address: 'address',
    city: 'city'
    zipcode: 'zipcode'
};

// Callback function to process the JSONP response
function handleData(response) {
    console.log('Received data:', response);
    // Process the JSONP response here
}

// Make JSONP request
jsonp(apiUrl, params, handleData);
