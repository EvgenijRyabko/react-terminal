export default (files) => {
  const validated = [];
  const failed = [];

  for (const file in files) {
    if (Object.hasOwn(files, file)) {
      if (file.size < 10 * 1048576) validated.push(file);
      else failed.push(file.name);

      validated.map((el) => ({
        ...el,
        name: el.name.replace(/[^A-Za-z0-9\s!?]/g, ''),
      }));
    }
  }

  return { validated, failed };
};
