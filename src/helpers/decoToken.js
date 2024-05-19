export function decoToken(token) {
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  console.log(tokenPayload);
  return tokenPayload;
}
