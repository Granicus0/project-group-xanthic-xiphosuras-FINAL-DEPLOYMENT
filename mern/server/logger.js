const logger = {
    logRequestDetails: (req) => {
        if (process.env.ENABLE_LOGS === 'true') {
            console.log("Route Parameters:", req.params);
            console.log("Query Parameters:", req.query);
            console.log("Authorization Header:", req.headers.authorization);
            console.log("Content-Type Header:", req.headers['content-type']);
            console.log("HTTP Method:", req.method);
            console.log("Requested Path:", req.path);
            console.log("Request Body:", req.body);
        }
    },
    logResponseDetails: (res) => {
        if (process.env.ENABLE_LOGS === 'true') {
            console.log("Response Status Code:", res.statusCode);
            console.log("Response Headers:", res.getHeaders());
            console.log("Response Body:", res.body); // Assuming your response body is accessible here
        }
    }
}

export default logger;
