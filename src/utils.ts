export const randomString = (
  len: number,
  charset: string = "qwertyuiopasdfghjklzxcvbnm1234567890"
) => {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return str;
};
