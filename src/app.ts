import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { PlanRouter } from "./routers/PlanRouter";

export const app = express();

app.use(morgan("tiny"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/plans/", PlanRouter);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.send("Hello World");
// });

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).send(error.message);
// });