import { perishableQuery } from "server/assetsView"

function Perishables({ data }) {
  return <div>    
  <div>
    <h3>
      List of my Perishables
    </h3>
    <p>
    <div>{data.Items.map((x) => (
        <li>{x.pk} {x.sk}  {x.count}</li>
      ))}</div>
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