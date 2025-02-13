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
            headerTitleStyle: {
              fontFamily: 'Teko_400Regular',
            },
            headerStyle: {
              backgroundColor: '#017CEE',
            },
            tabBarIcon: () => <Icon className="text-typography-500" as={Rainbow} size="md" />,
          }}
        />
        <Tabs.Screen
          name="isi"
          options={{
            title: 'Isı',
            headerStyle: {
              backgroundColor: '#E43921',
            },
            tabBarIcon: () => (
              <Icon className="text-typography-500" as={ThermometerSun} size="md" />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
