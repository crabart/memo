export default function TaskCard({
  name,
  isChange,
  cardRef,
  cardRefInput,
  cardClickHandler,
  cardSubmitHandler,
  cardInputBlurHandler,
  taskCardPadding,
  inputHeight,
  inputWidth,
  isDragging,
}) {
  const color = isDragging ? 'lightgreen' : 'lightblue';
  return (
    <div>
      <div className="taskCard" ref={cardRef} onClick={cardClickHandler}>
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
      </div>

      <style jsx>{`
        .taskCard {
          margin: 8px;
          border: 1px solid black;
          padding: ${taskCardPadding};
          background-color: ${color};
        }

        .taskCardInput {
          margin: 0px;
          height: ${inputHeight};
          width: ${inputWidth};
          outline: none;
          border: none;
        }
      `}</style>
    </div>
  );
}
