import { perishableQuery } from "server/assetsView"

function Perishables({ data }) {
  return <div>    
  <div class="container mx-auto px-6">
    <h2 class="text-2xl font-bold mb-2 text-white">
    List of my Perishables
    </h2>
    <h3 class="text-1xl mb-8 text-black-200">
    <div>{data.Items.map((x) => (
        <li>{x.pk} {x.sk}  {x.count}</li>
      ))}</div>
    </h3>

    <button class="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
      Refresh
    </button>
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