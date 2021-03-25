import { equipmentQuery } from "../server/assetsView"
import { sheepFarmItem } from "../types/sheepfarm"

// interface IProps {
//   data: Record<string, unknown>;
// }

function Equipment({ data }: any) {
  return <div>    
  <div>
    <h3>
      List of my Equipment
    </h3>
    <p>
    <table>      
      <tr>
        <th>Name</th>
        <th>Breed</th>
        <th>Last Serviced</th>
      </tr>   
      {data.Items.map((element: sheepFarmItem) => {
      return (
        <tr>
          <th>{element.name}</th>
          <th>{element.metadata.brand}</th>
          <th>{element.lastServiced}</th>
        </tr>
      )
    })}</table>
    </p>
  </div>
</div>
}

export async function getServerSideProps() {
  // Fetch data from DynamoDB
  const data = await equipmentQuery()
  return { props: { data } }
}

export default Equipment