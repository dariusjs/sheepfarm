import { useEffect, useState } from "react";
import { execute } from "server/dynamo"


export default function A() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  const [data, setData] = useState("");
  useEffect(() => {
    const getData = (async () => {
      const data = await execute().catch();
      console.log("AAA")
      setData(data.Item.sk)
    });
    getData();
  }, []);

  return  <div>
      <p>You clicked {count} times data: {data} </p>
      {/* <button onClick={() => setCount(count + 1)}> */}
      <button onClick={() => setData(data)}>
        Click me
      </button>
    </div>
}
