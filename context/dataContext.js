import { createContext, useState } from 'react';

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [data, set_Data] = useState({contract: '', address: ''});

  return (
    <DataContext.Provider value={[data, set_Data]}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;