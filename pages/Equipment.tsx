import { equipmentQuery } from "server/assetsView"

function Equipment({ data }) {
  return <div>    
  <div>
    <h3>
      List of my Equipment
    </h3>
    <p>
    <div>{data.Items.map((x) => (
        <li>{x.sk} {x.pk} Brand: {x.metadata.brand} LastServiced: {x.lastServiced}</li>
      ))}</div>
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