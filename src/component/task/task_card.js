import { Draggable } from "react-beautiful-dnd";

function TaskCard({ id, name, index }) {
  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="taskCard">
              <p>{name}</p>
            </div>
          </div>
        )}
      </Draggable>

      <style jsx="true">{`
        .taskCard {
          margin: 8px;
          border: 1px solid black;
          padding: 16px;
        }
      `}</style>
    </>
  );
}

export default TaskCard;
