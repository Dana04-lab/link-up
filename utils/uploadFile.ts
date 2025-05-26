export const uploadFile = async (file: File, folder: string) => {
  // Бұл тек имитация — нақты логика керек болса, backend-ке жүктеу кодын жазыңыз
  const fakeUrl = URL.createObjectURL(file);

  return {
    name: file.name,
    url: fakeUrl,
  };
};
