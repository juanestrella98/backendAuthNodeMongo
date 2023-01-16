const { Router } = require("express");
const { check } = require("express-validator");
const controller = require("../controllers/auth_controller");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//crear nuevo usuario
router.post(
  "/new",
  [
    check("name", "El nombre es un campo obligatorio!").not().isEmpty(),
    check("email", "El email es un campo obligatorio!").isEmail(),
    check("password", "El password es un campo obligatorio!").isLength({
      min: 5,
    }),
    validarCampos,
  ],
  controller.crearUsuario
);

//login usuario
router.post(
  "/",
  [
    check("email", "El email es un campo obligatorio!").isEmail(),
    check("password", "El password es un campo obligatorio!").isLength({min:5}),
    validarCampos,
  ],
  controller.loginUsuario
);

//renovar  usuario
router.get("/renew", controller.renovarUsuario);

module.exports = router;
