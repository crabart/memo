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
        },
        {
          id: "2",
          name: "タスクカード2",
        },
        {
          id: "3",
          name: "タスクカード3",
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
        },
        {
          id: "5",
          name: "タスクカード5",
        },
        {
          id: "6",
          name: "タスクカード6",
        },
      ],
    },
    {
      id: "3",
      name: "タスクボード3",
      taskCards: [
        {
          id: "7",
          name: "タスクカード7",
        },
        {
          id: "8",
          name: "タスクカード8",
        },
        {
          id: "9",
          name: "タスクカード9",
        },
      ],
    },
  ];

  const [taskBoard, setTaskBoard] = useState(defaultBoard);

  const onDragEndHandler = (data) => {
    if (!data.destination) {
      return;
    }

    const mainTaskBoard = [...taskBoard];
    const sourceTaskBoardIndex = mainTaskBoard.findIndex((element) => {
      return element.id === data.source.droppableId;
    });
    const sourceTaskCard = mainTaskBoard[sourceTaskBoardIndex].taskCards;

    const [removedCard] = sourceTaskCard.splice(data.source.index, 1);

    const destinationTaskBoardIndex = mainTaskBoard.findIndex((element) => {
      return element.id === data.destination.droppableId;
    });

    const destinationTaskCard =
      mainTaskBoard[destinationTaskBoardIndex].taskCards;

    destinationTaskCard.splice(data.destination.index, 0, removedCard);

    setTaskBoard(mainTaskBoard);
  };

  const onChangeTitleHandler = ({ name, boardId }) => {
    if (name === "") {
      return;
    }

    const index = taskBoard.findIndex((it) => {
      return it.id === boardId;
    });

    const newBoard = [...taskBoard];

    const sameNameBoard = newBoard.find((it) => it.name === name);
    if (sameNameBoard) {
      if (sameNameBoard.id !== boardId) {
        window.alert("同じ名前のタスクボードがあります");
      }
      return;
    }

    newBoard[index].name = name;

    setTaskBoard(newBoard);
  };

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
                changeNameCallback={onChangeTitleHandler}
              />
            );
          })}
        </DragDropContext>

        <style jsx>{`
          .main {
            display: flex;
          }
        `}</style>
      </div>
    </>
  );
}

export default Main;
