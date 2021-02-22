import { equipmentQuery } from "server/assetsView"

function Equipment({ data }) {
  return <div>List of my Equipment
    <div>{data.Items.map((x) => (
        <li>{x.sk} {x.pk} Brand: {x.metadata.brand} LastServiced: {x.lastServiced}</li>
      ))}</div>
  </div>

}

export async function getServerSideProps() {
  // Fetch data from DynamoDB
  const data = await equipmentQuery()
  return { props: { data } }
}

export default Equipment