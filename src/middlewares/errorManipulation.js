import express from "express";
import BaseError from "./errors/BaseError.js";
import AccessError from "./errors/AccessError.js";
import UserController from "../controller/UserController.js";
import verifyToken from "./verifyToken.js";
import { BSON } from "mongodb";
import ValidationError from "./errors/validationError.js";

function errorManipulation(erro, req, res, next) {
    if (erro.message === "invalid signature" || erro.message === "invalid token") {
        new AccessError().sendResponse(res);
    } else if (erro.message === "Document failed validation") {
        const errors = erro.errInfo.details.schemaRulesNotSatisfied[0].missingProperties;
        new ValidationError(errors).sendFieldsRequired(res, errors)
    } else {
        //console.log(erro)
        new BaseError().sendResponse(res);
    };
};

export default errorManipulation;