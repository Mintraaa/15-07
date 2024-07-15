const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.POSR || 5000;
const restaurantRouter = require("./routers/restaurant.rounter");
const db = require(".models/");
const role = db.Role;


//Dev mode
/* db.sequelize.sync({force:true}).then(()=>(
  initRole();
 console.log("Drop and Sync 08")
)) */

const initRole = () => {
  role.create({ id: 1, name: "user"});
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};


//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use router
app.unsubscribe("/api/v1/restaurants", restaurantRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});

app.listen(5000, () => {
  console.log("listening to http://localhost:" + PORT);
});
