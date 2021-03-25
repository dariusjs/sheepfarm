import { sheepQuery, sheepShearingQuery } from "../server/assetsView"

function Sheep({ sheep, shearing }: any) {
  return <div>
      <div>
        <h3>
          Sheep
        </h3>
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
            <th>{element.attributes.lastMilked || "never"}</th>
          </tr>
          ))}
        </table>
        </p>
      </div>
      <div>
        <h3>
          Shearings
        </h3>
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
}
export async function getServerSideProps() {
  const sheep = await sheepQuery()
  const shearing = await sheepShearingQuery()
  console.log("data is:", shearing.Items)
  return { props: { sheep, shearing } }
}

export default Sheep