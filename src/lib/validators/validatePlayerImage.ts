export const validateImage = (image: string) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const [extension] = image.split('.').slice(-1);
  if (!image) {
    return 'Image field cannot be empty';
  }
  if (
    !image.startsWith('https://images.fotmob.com/image_resources/playerimages/')
  ) {
    return 'Image should start with https://images.fotmob.com/image_resources/playerimages/';
  }
  if (!allowedExtensions.includes(extension)) {
    return 'Valid image extensions include jpg, jpeg, png, gif';
  }
  return '';
};
