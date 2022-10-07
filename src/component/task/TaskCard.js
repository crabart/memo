import { useState, useRef, useEffect } from 'react';

export default function TaskCard({
  id,
  name,
  changeCardNameCallBack,
  isDragging,
}) {
  const [isChange, setIsChange] = useState(false);
  const [inputWidth, setInputWidth] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const cardRefInput = useRef(null);
  const cardRef = useRef(null);

  const defaultCardPadding = '16px';

  const taskCardPadding = isChange ? '0px' : defaultCardPadding;

  useEffect(() => {
    if (isChange) {
      cardRefInput.current.focus();
    }
  }, [isChange]);

  const cardClickHandler = () => {
    if (!isChange) {
      setInputHeight(cardRef.current.clientHeight - 2 + 'px');
      setInputWidth(cardRef.current.clientWidth - 4 + 'px');
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
