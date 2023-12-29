export function randomString(
  len: number,
  charset: string = "qwertyuiopasdfghjklzxcvbnm1234567890"
) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return str;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function removeDuplicates<T>(
  arr: T[],
  key: (item: T) => string | number | symbol = (item) => String(item)
) {
  const flag = {} as Record<string | number | symbol, boolean>;
  return arr.filter((item) =>
    flag[key(item)] ? false : (flag[key(item)] = true)
  );
}
