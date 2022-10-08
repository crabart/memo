import { useState, useRef, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCardDrag';

function TaskBoard({
  boardName,
  boardId,
  taskCards,
  changeBoardNameCallback,
  changeCardNameCallback,
  addCardCallback,
}) {
  const [isChange, setIsChange] = useState(false);
  const [inputWidth, setInputWidth] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const titleRefInput = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isChange) {
      titleRefInput.current.focus();
    }
  }, [isChange]);

  const titleClickHandler = () => {
    if (!isChange) {
      setInputHeight(titleRef.current.clientHeight - 6 + 'px');
      setInputWidth(titleRef.current.clientWidth - 8 + 'px');
      setIsChange(true);
    }
  };

  const titleSubmitHandler = (e) => {
    e.preventDefault();

    titleInputBlurHandler();
  };

  const titleInputBlurHandler = () => {
    const nextTitle = titleRefInput.current.value;
    if (nextTitle !== '' || nextTitle !== boardName) {
      changeBoardNameCallback({ name: nextTitle, boardId: boardId });
    }
    setIsChange(false);
  };

  const changeCardNameHandler = ({ name, cardId }) => {
    changeCardNameCallback({ name, cardId, boardId: boardId });
  };

  return (
    <>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <div
            className="taskBoard"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h3 onClick={titleClickHandler} ref={titleRef}>
              {isChange ? (
                <form action="" onSubmit={titleSubmitHandler}>
                  <input
                    className="taskTitleInput"
                    onBlur={titleInputBlurHandler}
                    ref={titleRefInput}
                    placeholder={boardName}
                    defaultValue={boardName}
                  />
                </form>
              ) : (
                boardName
              )}
            </h3>

            {taskCards.map((card, index) => {
              return (
                <TaskCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  index={index}
                  changeCardNameCallBack={changeCardNameHandler}
                />
              );
            })}
            {provided.placeholder}
            <div className="addCard">
              <button
                onClick={() => addCardCallback(boardId)}
                className="addCardButton"
              >
                +
              </button>
            </div>
          </div>
        )}
      </Droppable>

      <style jsx>{`
        .taskBoard {
          margin: 10px 0 10px 10px;
          border: 1px solid black;
        }

        .taskBoard h3 {
          margin: 0px;
          border-bottom: 1px solid black;
        }

        .taskTitleInput {
          height: ${inputHeight};
          width: ${inputWidth};
        }

        .addCard {
          display: flex;
          justify-content: flex-end;
          margin-right: 10px;
          margin-bottom: 10px;
        }

        .addCardButton {
          font-size: 30px;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export default TaskBoard;
