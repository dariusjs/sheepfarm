import { sheepQuery, sheepShearingQuery } from "server/assetsView"

function Sheep({ sheep, shearing }) {
  return <div>
      <div>
        <h3>
          Sheep
        </h3>
        <p>
          <div>{sheep.Items.map((x) => (
          <li>{x.pk} Breed: {x.metadata.breed} LastMilked: {x.attributes.lastMilked || "never"}</li>
        ))}</div>
        </p>
      </div>
      <div>
        <h3>
          Shearings
        </h3>
        <p>
          <div>{shearing.Items.map((x) => (
          <li>{x.pk} {x.sk} {x.count}</li>
        ))}</div>
        </p>
      </div>
  </div>
}
export async function getServerSideProps() {
  const sheep = await sheepQuery()
  const shearing = await sheepShearingQuery()
  console.log("cry")
  console.log("data is:", shearing.Items)
  return { props: { sheep, shearing } }
}

export default Sheep