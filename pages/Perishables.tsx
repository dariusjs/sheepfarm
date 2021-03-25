import { perishableQuery } from "../server/assetsView"

function Perishables({ data }: any) {
  return <div>    
  <div>
    <h3>
      List of my Perishables
    </h3>
    <p>
    <table> 
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Amount (Tons)</th>
      </tr>  
      {data.Items.map((element: any) => (
        <tr>
          <th>{element.name}</th>
          <th>{element.type}</th>
          <th>{element.count}</th>
        </tr>
      ))}
    </table>
    </p>
  </div>
</div>

}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from DynamoDB
  const data = await perishableQuery()
  return { props: { data } }
}

export default Perishables