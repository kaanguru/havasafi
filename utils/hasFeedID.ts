import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function hasFeedID() {
  const fi = await AsyncStorage.getItem('feedID');
  return fi !== null;
}
