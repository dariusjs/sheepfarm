import React from 'react';
import { useTable } from 'react-table';
import { sheepQuery, sheepShearingQuery } from '../server/assetsView';

function Sheep({ sheep, shearing }: any) {
  const sheeple = sheep.Items.map((element: any) => {
    return {
      col1: element.name,
      col2: element.metadata.breed,
      col3: element.attributes.lastMilked || 'never'
    };
  });

  const shearings = shearing.Items.map((element: any) => {
    return {
      col1: element.name,
      col2: element.date,
      col3: element.count
    };
  });

  const data = React.useMemo(() => sheeple, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1'
      },
      {
        Header: 'Breed',
        accessor: 'col2'
      },
      {
        Header: 'Milked',
        accessor: 'col3'
      }
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <div>
      <div>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip'
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip'
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Sheep</h3>
        <p>
          <table>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Last Milked</th>
            </tr>
            {sheep.Items.map((element: any) => (
              <tr>
                <th>{element.name}</th>
                <th>{element.metadata.breed}</th>
                <th>{element.attributes.lastMilked || 'never'}</th>
              </tr>
            ))}
          </table>
        </p>
      </div>
      <div>
        <h3>Shearings</h3>
        <p>
          <table>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Count (KG)</th>
            </tr>
            {shearing.Items.map((element: any) => (
              <tr>
                <th>{element.name}</th>
                <th>{element.date}</th>
                <th>{element.count}</th>
              </tr>
            ))}
          </table>
        </p>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const sheep = await sheepQuery();
  const shearing = await sheepShearingQuery();
  console.log('data is:', shearing.Items);
  return { props: { sheep, shearing } };
}

export default Sheep;
