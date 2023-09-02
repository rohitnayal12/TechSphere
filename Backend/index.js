const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { UserRoute } = require("./Routes/user.routes");

const app = express();
app.use(cors())
app.use(express.json());

app.use("/user", UserRoute);


//Routes
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the backend of TechSphere");
});



//Server Running
const port = process.env.PORT || 8080;

app.listen(port, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${port}`);
	} catch (error) {
		console.error(error.message);
	}
});



