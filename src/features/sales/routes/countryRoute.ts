import { Router } from "express";
import { CountryController } from "../controllers";

export const countryRoute = Router();

countryRoute.get('/',
    CountryController.getAllCountries
)