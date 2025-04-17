
import { Toaster } from 'sonner';
import Index from '@/pages/Index';

function App() {
  return (
    <>
      <Index />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App;
