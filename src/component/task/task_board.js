import { useState, useRef, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./task_card";

function TaskBoard({ boardName, boardId, taskCards }) {
  const [isChange, setIsChange] = useState(false);
  const [inputWidth, setInputWidth] = useState("");
  const [inputHeight, setInputHeight] = useState("");
  const titleRefInput = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    console.log(inputWidth);
    console.log(inputHeight);

    if (isChange) {
      titleRefInput.current.focus();
    }
  }, [isChange]);

  const titleClickHandler = () => {
    console.log(titleRef.current.clientHeight);
    console.log(titleRef.current.clientWidth);
    if (!isChange) {
      setInputHeight(titleRef.current.clientHeight - 6 + "px");
      setInputWidth(titleRef.current.clientWidth - 8 + "px");
      setIsChange(true);
    }
  };

  const titleInputBlurHandler = () => {
    setIsChange(false);
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
                <input
                  className="taskTitleInput"
                  onBlur={titleInputBlurHandler}
                  ref={titleRefInput}
                  placeholder="タイトル変更"
                ></input>
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

        .taskTitleInput {
          height: ${inputHeight};
          width: ${inputWidth};
        }
      `}</style>
    </>
  );
}

export default TaskBoard;
