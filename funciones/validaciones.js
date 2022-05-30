export const validarVar = async (variable) => {
  if (variable === "" || variable === null || variable === undefined) {
    return false;
  } else {
    return true;
  }
};
