import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getFeedID(): Promise<string | null> {
  return await AsyncStorage.getItem('feedID');
}
