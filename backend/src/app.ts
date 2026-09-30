import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "API funcionando",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
