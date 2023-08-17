import { app } from "./app.js";
import { connectdb } from "./data/database.js";

app.listen(process.env.PORT, () => {
  console.log(
    `server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
connectdb();
  