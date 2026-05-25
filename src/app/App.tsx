import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WellnessProvider } from './wellnessState';

export default function App() {
  return (
    <WellnessProvider>
      <RouterProvider router={router} />
    </WellnessProvider>
  );
}