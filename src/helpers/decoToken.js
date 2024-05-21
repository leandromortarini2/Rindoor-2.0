/**
 * Esta funcion decodifica el token y devuelve los datos del usuario.
 * @param {string} token  Recibe un token
 * @returns {object}  devuelve los datos del usuario
 */

export function decoToken(token) {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  console.log(tokenPayload);
  return tokenPayload;
}
