'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Criando o cliente do React Query
const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
