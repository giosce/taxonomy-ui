import { useContext } from 'react';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style.css';
import TaxonomyDataContext from "./TaxonomyDataContext"

function TaxonomyTree(): JSX.Element {

  const { issuesMap, isLoading } = useContext(TaxonomyDataContext);
  console.log(issuesMap);

  const taxonomyData: any = { root: {} }
  issuesMap.forEach((value: string[], key: string) => {
    taxonomyData.root[key] = {}
    value.forEach((val) => {
      taxonomyData.root[key][val] = null
    });
  });
  console.log(taxonomyData)

  const taxTree = readTemplate(taxonomyData)
  console.log(taxTree);

  return (

    <div>
      {isLoading ? "Loading..." :
        <UncontrolledTreeEnvironment
          dataProvider={new StaticTreeDataProvider(taxTree.items, (item, data) => ({ ...item, data }))}
          getItemTitle={item => item.data}
          viewState={{}}
        >
          <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example 2" />
        </UncontrolledTreeEnvironment>
      }
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
