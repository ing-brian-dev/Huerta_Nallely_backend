import { Router } from "express";
import { param } from "express-validator";
import { validateRequest } from "@/middlewares";
import { OrchardCropController } from "../controllers/OrchardCropController";
import { validateOrchardCropInput } from "../middlewares/validateOrchardCropInput";

export const orchardCropRoute = Router();

const validateId = param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo.");

orchardCropRoute.post(
    "/",
    validateOrchardCropInput,
    validateRequest,
    OrchardCropController.create
);

orchardCropRoute.get("/", OrchardCropController.getAll);

orchardCropRoute.get(
    "/orchard/:orchardId",
    param("orchardId")
        .isInt({ min: 1 })
        .withMessage("El id de la huerta debe ser un número entero positivo."),
    validateRequest,
    OrchardCropController.getAllByOrchardId
);

orchardCropRoute.get(
    "/orchard/:orchardId/availability",
    param("orchardId")
        .isInt({ min: 1 })
        .withMessage("El id de la huerta debe ser un número entero positivo."),
    validateRequest,
    OrchardCropController.getAvailability
);

orchardCropRoute.get(
    "/:id",
    validateId,
    validateRequest,
    OrchardCropController.getById
);

orchardCropRoute.put(
    "/:id",
    validateId,
    validateOrchardCropInput,
    validateRequest,
    OrchardCropController.update
);

orchardCropRoute.delete(
    "/:id",
    validateId,
    validateRequest,
    OrchardCropController.delete
);
