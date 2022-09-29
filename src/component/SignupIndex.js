import LoginForm from "./login/LoginForm";

export default function SignupIndex() {
  const onSubmitHandler = () => {};

  return (
    <div className="main">
      <div className="title">
        <h1>メモアプリケーションテストへようこそ</h1>
      </div>

      <LoginForm title={"Sign Up"} onSubmitCallback={onSubmitHandler} />

      <style jsx>{`
        .main {
          background-image: url("24474687_m.jpg");
          background-size: cover;
          min-height: 800px;
        }

        .title {
          text-align: center;
          color: white;
          margin-bottom: 100px;
        }
      `}</style>
    </div>
  );
}
