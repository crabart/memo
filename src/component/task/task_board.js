import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./task_card";

function TaskBoard({ boardName, boardId, taskCards }) {
  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <div
            className="taskBoard"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h3>{boardName}</h3>

            {taskCards.map((card, index) => {
              return (
                <TaskCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <style jsx="true">{`
        .taskBoard {
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
