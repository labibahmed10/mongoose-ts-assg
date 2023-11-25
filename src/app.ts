import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// url encoder
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("App is running");
});

// global route error handler
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Invalid Route Name",
  });
});
export default app;
