function Main() {
  return (
    <>
      <div className="main">
        <div className="taskBoard">
          <h3>タスクボード1</h3>
          <div className="taskCard">
            <p>タスクカード1</p>
          </div>

          <div className="taskCard">
            <p>タスクカード2</p>
          </div>

          <div className="taskCard">
            <p>タスクカード3</p>
          </div>
        </div>

        <div className="taskBoard">
          <h3>タスクボード2</h3>
          <div className="taskCard">
            <p>タスクカード3</p>
          </div>

          <div className="taskCard">
            <p>タスクカード4</p>
          </div>

          <div className="taskCard">
            <p>タスクカード5</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .taskBoard {
          display: inline-block;
          margin: 10px 0 10px 10px;
          border: 1px solid black;
        }

        .taskBoard h3 {
          margin: 0px;
          border-bottom: 1px solid black;
        }

        .taskCard {
          margin: 8px;
          border: 1px solid black;
          padding: 16px;
        }
      `}</style>
    </>
  );
}

export default Main;
