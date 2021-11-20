import { TaxonomyDataContextProvider } from './TaxonomyDataContext';
import TaxonomyTree from './TaxonomyTree';

function App() {
  return (
    <TaxonomyDataContextProvider>
      <TaxonomyTree/>
    </TaxonomyDataContextProvider>
);
}

export default App;
