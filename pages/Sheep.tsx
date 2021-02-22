import { sheepQuery } from "server/assetsView"

function Sheep({ data }) {
  return <div>List of my Sheep
    <div>{data.Items.map((x) => (
        <li>{x.pk} Breed: {x.metadata.breed} LastMilked: {x.attributes.lastMilked || "never"}</li>
      ))}</div>
  </div>

}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await sheepQuery()
  console.log("meow", data)
  // const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Sheep