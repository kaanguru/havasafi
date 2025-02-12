import { Tabs } from 'expo-router';
import { Rainbow, ThermometerSun } from 'lucide-react-native';

import { Icon } from '~/components/ui/icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kalite',
          headerTitleStyle: {
            fontFamily: 'Teko_400Regular',
          },
          headerStyle: {
            backgroundColor: '#00AD46',
          },
          tabBarIcon: () => <Icon className="text-typography-500" as={Rainbow} size="md" />,
        }}
      />
      <Tabs.Screen
        name="isi"
        options={{
          title: 'Isı',
          tabBarIcon: () => <Icon className="text-typography-500" as={ThermometerSun} size="md" />,
        }}
      />
    </Tabs>
  );
}
