import { useEffect, useState } from 'react';
import { execute } from 'server/dynamo';
import { sheep } from './sheep';

export default function Home() {


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = "Sheepview";
  });

  const [data, setData] = useState({
    pk: '',
    sk: ''
  });
  useEffect(() => {
    const getData = (async () => {
      const data: sheep = await execute().catch();
      console.log(data)
      setData({
        pk: data.pk,
        sk: data.sk
      })
    });
    getData();
  }, []);

  return  <div>
      <p>data: {data.pk} </p>
      <p>data: {data.sk} </p>
      <button onClick={() => setData(data)}>
        Refresh
      </button>
      <div>
        <p>data: {data.pk} </p>
        <p>data: {data.sk} </p>
        <button onClick={() => setData(data)}>
          Refresh
        </button>
      </div>
    </div>
}
