/**
 * Decodifica un token JWT y devuelve su payload.
 *
 * @function decoToken
 * @param {string} token - El token JWT que se desea decodificar.
 * @returns {Object} El payload del token decodificado.
 */
export function decoToken(token) {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  // console.log(tokenPayload);
  return tokenPayload;
}
