import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log("pickImage", result.assets[0].uri);

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};