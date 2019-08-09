// This is the file we enable Cross Origin Resource Sharing
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// https://www.techopedia.com/definition/2413/http-request-header

module.exports = (request, response, next) => {
    // This is for what clients may access the server * = all;
    response.header("access-control-allow-origin", "*");
    // This is for what HTTP methods are allowed; 
    response.header("access-control-allow-methods", "GET, POST, PUT, DELETE");

    response.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
};