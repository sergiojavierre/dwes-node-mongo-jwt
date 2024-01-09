import express from "express";
import createMongoConnection from "./context/db/mongo.db";
createMongoConnection();

import userRouter from "./users/infrastructure/rest/user.routes";
import productRouter from "./products/infrastructure/rest/product.routes";

const app = express();
const port = 8080;

app.use(express.json());
const api = "/api";
app.use(`${api}/users`, userRouter);
app.use(`${api}/products`, productRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
