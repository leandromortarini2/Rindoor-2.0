export const validationsNewPost = (input) => {
  const errors = {};
  const decimalRegex = `^\d+(\.\d+)?$`;

  // VALIDACION TITLE
  if (!input.name) errors.name = "Debe ingresar un título";
  else if (input.name.length < 5) {
    errors.name = "El título debe tener al menos 5 caracteres";
  } else if (input.name.length > 10) {
    errors.name = "El título debe tener un máximo de 10 caracteres";
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
