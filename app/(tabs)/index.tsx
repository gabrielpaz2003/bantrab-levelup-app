import RoadmapScreen from '@/src/screens/RoadmapScreen';
import { StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RoadmapScreen />
    </>
  );
}
