import { useState } from "react";
import TaskBoard from "./task/task_board";
import { DragDropContext } from "react-beautiful-dnd";

function Main() {
  const defaultBoard = [
    {
      id: "1",
      name: "タスクボード1",
      taskCards: [
        {
          id: "1",
          name: "タスクカード1",
          index: 1,
        },
        {
          id: "2",
          name: "タスクカード2",
          index: 2,
        },
        {
          id: "3",
          name: "タスクカード3",
          index: 3,
        },
      ],
    },
    {
      id: "2",
      name: "タスクボード2",
      taskCards: [
        {
          id: "4",
          name: "タスクカード4",
          index: 1,
        },
        {
          id: "5",
          name: "タスクカード5",
          index: 2,
        },
        {
          id: "6",
          name: "タスクカード6",
          index: 3,
        },
      ],
    },
  ];

  const [taskBoard, setTaskBoard] = useState(defaultBoard);

  function onDragEndHandler() {}

  return (
    <>
      <div className="main">
        <DragDropContext onDragEnd={onDragEndHandler}>
          {taskBoard.map((board) => {
            return (
              <TaskBoard
                key={board.name}
                boardName={board.name}
                boardId={board.id}
                taskCards={board.taskCards}
              />
            );
          })}
        </DragDropContext>

        <style jsx="true">{`
          .main {
            display: inline-block;
          }
        `}</style>
      </div>
    </>
  );
}

export default Main;
