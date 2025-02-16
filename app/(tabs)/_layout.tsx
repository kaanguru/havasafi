import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import { Rainbow, ThermometerSun } from 'lucide-react-native';

import { Icon } from '~/components/ui/icon';
const queryClient = new QueryClient();

export default function TabLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Kalite',
            headerShown: false,
            tabBarIcon: () => <Icon className="text-typography-500" as={Rainbow} size="md" />,
          }}
        />
        <Tabs.Screen
          name="isi"
          options={{
            title: 'Isı',
            headerShown: false,

            tabBarIcon: () => (
              <Icon className="text-typography-500" as={ThermometerSun} size="md" />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
