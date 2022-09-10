import TaskCard from "./task_card";

function TaskBoard({ boardName, taskCards }) {
  return (
    <>
      <div className="taskBoard">
        <h3>{boardName}</h3>

        {taskCards.map((card) => {
          return <TaskCard name={card.name} />;
        })}
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
      `}</style>
    </>
  );
}

export default TaskBoard;
