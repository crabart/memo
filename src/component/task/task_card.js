function TaskCard({ name }) {
  return (
    <>
      <div className="taskCard">
        <p>{name}</p>
      </div>

      <style jsx>{`
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
