import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

function TaskCardDrag({ id, name, index, changeCardNameCallBack }) {
  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard
                id={id}
                name={name}
                changeCardNameCallBack={changeCardNameCallBack}
                isDragging={snapshot.isDragging}
              />
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default TaskCardDrag;
