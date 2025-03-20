/**
 * The following route declarations can parse path parameters a and b encoded in paths
 * "/lab5/add/:a/:b" and "/lab5/subtract/:a/:b"
 */
export default function PathParameters(app) {
    app.get("/lab5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;   // route expexts 2 path parameters after "/lab5/add" retrieve path parameters as strings
      const sum = parseInt(a) + parseInt(b); // paese as integers and adds
      res.send(sum.toString()); // send sum as string response as integer might be interpreted as status code by the browser
    });
    app.get("/lab5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) - parseInt(b);
      res.send(sum.toString());
    });
    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
      });
    app.get("/lab5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) / parseInt(b);
    res.send(sum.toString());
    });
  };
  