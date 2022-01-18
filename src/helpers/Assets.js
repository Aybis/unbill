export function removeCSSClass(ele, cls) {
  const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  ele.className = ele.className.replace(reg, ' ');
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const imageApi = (name) =>
  `https://ui-avatars.com/api/?background=f4f4f5&color=000&length=3&name=${name}`;

export const imageApiAvatarUser = (name) =>
  `https://ui-avatars.com/api/?background=0062FF&color=FFF&length=3&name=${name}`;

export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase(),
  );
