const express = require("express");
const cors = require("cors");
const { responseJson } = require("./utils/utility");
const config = require("./config/config");
const SurahRoutes = require("./routes/surahs.route");
const RandomRoutes = require("./routes/random.route");
const HomeRoutes = require("./routes/home.route");

const app = express();
app.use(cors());
app.disable("x-powered-by");

app.use("/surahs", SurahRoutes);
app.use("/random", RandomRoutes);
app.get("/", HomeRoutes);
app.all("*", (req, res) =>
  res.status(404).send(responseJson(null, "not found", false))
);

app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});
