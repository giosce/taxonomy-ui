import { useContext, useState, useEffect, useMemo  } from 'react';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style.css';
import TaxonomyDataContext from "./TaxonomyDataContext"

function TaxonomyTree(): JSX.Element {
    // const [taxonomy, setTaxonomy] = useState({});
    const [taxonomyTree, setTaxonomyTree] = useState<any>( { root: {} } );
    const [taxTree, setTaxTree] = useState( readTemplate(taxonomyTree) );

    // useEffect (() => { 
    const { issuesMap } = useContext(TaxonomyDataContext);
    // console.log(issuesMap);
    
    // useEffect(() => setTaxonomyTree( { root: { } })

    useEffect(() => {
      issuesMap.forEach((value: string[], key: string) => {
        taxonomyTree.root[key] = {}
        value.forEach((val) => {
          taxonomyTree.root[key][val] = null
        });
      });
      console.log("Refreshed on issuesMap!");
      setTaxTree(readTemplate(taxonomyTree));
    }, [issuesMap]);
    

    // const  taxonomyData = taxonomyTree
    // const taxTree = useMemo(() => readTemplate(taxonomyTree), [taxonomyTree]);
    console.log(taxTree);
    // console.log(longTree)
    // setTaxonomy(taxTree);
    // }, []);

    return (
      <div>
        <UncontrolledTreeEnvironment
          dataProvider={new StaticTreeDataProvider(taxTree.items, (item, data) => ({ ...item, data }))}
          getItemTitle={item => item.data}
          viewState={{}}
        >
          <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example 2" />
        </UncontrolledTreeEnvironment>
      </div>
    );
}

const readTemplate = (template: any, data: any = { items: {} }) => {
  for (const [key, value] of Object.entries(template)) {
    data.items[key] = {
    index: key,
    canMove: true,
    hasChildren: value !== null,
    children: value !== null ? Object.keys(value as object) : undefined,
    data: key,
    canRename: true
    };

    if (value !== null) {
    readTemplate(value, data);
    }
  }
  return data;
};

export default TaxonomyTree;
