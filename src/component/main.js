import { useState } from "react";
import TaskBoard from "./task/task_board";

function Main() {
  const defaultBoard = [
    {
      name: "タスクボード1",
      taskCards: [
        {
          name: "タスクカード1",
        },
        {
          name: "タスクカード2",
        },
        {
          name: "タスクカード3",
        },
      ],
    },
    {
      name: "タスクボード2",
      taskCards: [
        {
          name: "タスクカード4",
        },
        {
          name: "タスクカード5",
        },
        {
          name: "タスクカード6",
        },
      ],
    },
  ];

  const [taskBoard, setTaskBoard] = useState(defaultBoard);

  return (
    <>
      <div className="main">
        {taskBoard.map((board) => {
          return (
            <TaskBoard boardName={board.name} taskCards={board.taskCards} />
          );
        })}
      </div>
    </>
  );
}

export default Main;
