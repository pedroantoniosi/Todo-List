import { Router } from "express";

import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
