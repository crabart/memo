import { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const defaultCardPadding = '16px';

function TaskCardDrag({ id, name, index, changeCardNameCallBack }) {
  const [isChange, setIsChange] = useState(false);
  const [inputWidth, setInputWidth] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const cardRefInput = useRef(null);
  const cardRef = useRef(null);

  const taskCardPadding = isChange ? '0px' : defaultCardPadding;

  useEffect(() => {
    if (isChange) {
      cardRefInput.current.focus();
    }
  }, [isChange]);

  const cardClickHandler = () => {
    if (!isChange) {
      setInputHeight(cardRef.current.clientHeight - 2 + 'px');
      setInputWidth(cardRef.current.clientWidth - 8 + 'px');
      setIsChange(true);
    }
  };

  const changeCardNameImpl = ({ name }) => {
    changeCardNameCallBack({ name: name, cardId: id });
    setIsChange(false);
  };

  const cardSubmitHandler = (e) => {
    e.preventDefault();
    changeCardNameImpl({ name: e.target.newName.value });
  };

  const cardInputBlurHandler = (e) => {
    changeCardNameImpl({ name: e.target.value });
  };

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
                name={name}
                isChange={isChange}
                cardRef={cardRef}
                cardRefInput={cardRefInput}
                cardClickHandler={cardClickHandler}
                cardSubmitHandler={cardSubmitHandler}
                cardInputBlurHandler={cardInputBlurHandler}
                taskCardPadding={taskCardPadding}
                inputHeight={inputHeight}
                inputWidth={inputWidth}
                isDragging={snapshot.isDragging}
              />
              {/* <div
                className="taskCard"
                ref={cardRef}
                onClick={cardClickHandler}
              >
                {isChange ? (
                  <form action="" onSubmit={cardSubmitHandler}>
                    <input
                      className="taskCardInput"
                      onBlur={cardInputBlurHandler}
                      ref={cardRefInput}
                      placeholder={name}
                      defaultValue={name}
                      name="newName"
                    />
                  </form>
                ) : (
                  <p>{name}</p>
                )}
              </div> */}
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default TaskCardDrag;
