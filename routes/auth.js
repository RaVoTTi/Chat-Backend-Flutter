/* 
path = /api/login

*/

// Router = rutas en Express
const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");

// it's the same kind of import
const {
  createUser,
  loginUser,
//   renewToken,
} = require("../controllers/auth_controller");
//
const validateCamps = require("../middlewares/validate_camps").validateCamps;

const { validateJWT } = require("../middlewares/validate_JWT");
router.post(
  "/new",
  [
    check("name", "Falta el nombre").not().isEmpty(), // middlewares
    validateCamps,
    check("email", "No es un email valido").isEmail(),
    validateCamps,
    check(
      "password",
      "La contrasena debe contener como min 7 caracteres"
    ).isLength({ min: 7 }),
    validateCamps,
  ],
  createUser
); // controller
router.post("/", [
  check("email", "No es un email valido").isEmail(),
  check("password", "La contrasena no es valida").isLength({ min: 7 }),
  loginUser,
]);

// router.get("/renew", validateJWT, renewToken);

module.exports = { router };
