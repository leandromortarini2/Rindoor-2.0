/**
 * Realiza validaciones para un nuevo post.
 *
 * @function validationsNewPost
 * @param {Object} input - Datos del formulario para un nuevo post.
 * @returns {Object} Objeto que contiene los errores de validación.
 */
export const validationsNewPost = (input) => {
  const errors = {};

  // VALIDACION TITLE
  if (!input.name) errors.name = "Debe ingresar un título";
  else if (input.name.length < 5) {
    errors.name = "El título debe tener al menos 5 caracteres";
  } else if (input.name.length > 30) {
    errors.name = "El título debe tener un máximo de 30 caracteres";
  }

  // // VALIDACION CATEGORY
  // else if (!input.category) errors.category = "Debe ingresar una categoría";
  // VALIDACION DESCRIPTION
  else if (!input.description)
    errors.description = "Debe ingresar una descripción";
  else if (input.description.length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  } else if (input.description.length > 100) {
    errors.description =
      "La descripción debe tener un máximo de 100 caracteres";
  }

  // VALIDACION PAYMENT
  else if (!input.base_price) {
    errors.base_price = "Debe ingresar un valor";
    // } else if (decimalRegex.test(input.base_price)) {
    //   errors.base_price = "El valor debe ser un número";
  }
  return errors;
};

export const validationsUpdate = (input) => {
  const errors = {};

  // Validación del nombre
  if (!input.name) {
    errors.name = "Debe ingresar un título";
  } else if (input.name.length < 5) {
    errors.name = "El título debe tener al menos 5 caracteres";
  } else if (input.name.length > 30) {
    errors.name = "El título debe tener un máximo de 10 caracteres";
  }

  // Validación del email
  if (!input.email) {
    errors.email = "Debe ingresar un correo electrónico";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Debe ingresar un correo electrónico válido";
  }

  // Validación del teléfono
  if (!input.phone) {
    errors.phone = "Debe ingresar un número de teléfono";
  } else if (!/^\d{10}$/.test(input.phone)) {
    errors.phone = "El número de teléfono debe tener 10 dígitos";
  }

  // Validación de la provincia
  if (!input.province) {
    errors.province = "Debe seleccionar una provincia";
  }

  // Validación de la dirección
  if (!input.address) {
    errors.address = "Debe ingresar una dirección";
  }

  // Validación del rol
  if (!input.role) {
    errors.role = "Debe seleccionar un tipo de usuario";
  }

  // Validación de la categoría (si el rol es "professional")
  if (
    input.role === "professional" &&
    (!input.categories || input.categories.length === 0)
  ) {
    errors.categories = "Debe seleccionar al menos una categoría";
  }

  return errors;
};
