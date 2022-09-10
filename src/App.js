import Counter from './features/counter/counter';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [getFlag, setGetFlag] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      setJsonData(res.data);
      console.log(res.data);
    })
  }, [getFlag])

  function onClickHandler() {
    setGetFlag(prev => !prev)
  }

  return (
    <>
      <Counter></Counter>
      <button onClick={onClickHandler}>取得</button>
      {/* <pre>{JSON.stringify(jsonData, null, '\t')}</pre> */}
      {/* <pre>{jsonData}</pre> */}
      {jsonData?.map((dat) => {
        return (
          <div key={dat.id}>
            <h3>{dat.id}:{dat.title}</h3>
            <p>{dat.body}</p>
          </div>
        )
      })}
    </>
  );
}

export default App;
