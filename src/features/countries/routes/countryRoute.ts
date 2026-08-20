import { Router } from "express";
import { CountryController } from "../controllers/CountryController";

export const countryRoute = Router();

countryRoute.get('/',
    CountryController.getAllCountries
)