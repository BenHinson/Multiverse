const express = require("express");

const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

app.get("/", async (req, res) => {
    const cities = await City.findAll();
    res.render("home", { cities });
});
