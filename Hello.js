// console.log("Hello World!");
/**  The "app" instance is used to configure the server on what to do when various types of requests are received.
 E.g. "app.get()" function configures an HTTP GET request handler by mapping the URL pattern "/hello" to a function that handles the HTTP request.
 a request to URL "http://localhost:4000/hello" triggers the function implemented in the second argument of "app.get()"
 The handler function receives parameters (req, res) which allows the function to participate in the request/response interaction common in client/server applications.
 The "res.send()" function responds to the request with "Hello World!" text message.
*/

export default function Hello(app) { // pass "app" as a parameter in the function so that this function can be invoked in "index.js"
    app.get('/hello', (req, res) => {res.send('Life is good!')})
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')})
}