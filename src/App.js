import { useState } from 'react';

function Button({ text, clickHandler }) {
  return (
    <>
      <button onClick={clickHandler}>
        {text}
      </button>
    </>
  );
}

function Feedback({
  goodClickHandler,
  neutralClickHandler,
  badClickHandler,
}) {
  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandler={goodClickHandler} text='good' />
      <Button clickHandler={neutralClickHandler} text='neutral' />
      <Button clickHandler={badClickHandler} text='bad' />
    </div>
  );
}

function StatisticLine({ text, amount }) {
  return (
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {amount}
      </td>
    </tr>
  );
}

function Statistics({
  goodCounter,
  neutralCounter,
  badCounter,
}) {
  const all = goodCounter + neutralCounter + badCounter;
  const average = (goodCounter - badCounter ) / all;
  const positive = (goodCounter / all) * 100;
  
  if (all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' amount={goodCounter} />
          <StatisticLine text='neutral' amount={neutralCounter} />
          <StatisticLine text='bad' amount={badCounter} />
          <StatisticLine text='all' amount={all} />
          <StatisticLine text='average' amount={average} />
          <StatisticLine text='positive' amount={`${positive} %`} />
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  function counterSetGenerator(counter, setter) {
    return () => setter(counter+1);
  }

  return (
    <div>
      <Feedback 
        goodClickHandler={counterSetGenerator(goodCounter, setGoodCounter)}
        neutralClickHandler={counterSetGenerator(neutralCounter, setNeutralCounter)}
        badClickHandler={counterSetGenerator(badCounter, setBadCounter)}
      />
      <Statistics 
        goodCounter={goodCounter}
        neutralCounter={neutralCounter}
        badCounter={badCounter}
      />
    </div>
  );
}

export default App;
