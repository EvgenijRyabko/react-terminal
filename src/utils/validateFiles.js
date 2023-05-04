export default (files) => {
  const validated = [];
  const failed = [];
  const regExp = /[а-яё\s-]+/i;

  for (let i = 0; i < files.length; i++) {
    if (files[i].size < 10 * 1048576) {
      if (!regExp.test(files[i].name)) validated.push(files[i]);
      else failed.push({ file: files[i].name, error: 'wrong name' });
    } else failed.push({ file: files[i].name, error: 'exceeded size' });
  }

  return { validated, failed };
};
