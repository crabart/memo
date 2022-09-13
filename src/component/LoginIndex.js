import { useForm } from "react-hook-form";

function LoginIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("submitted");
  };

  return (
    <div className="main">
      <h1>ログイン画面予定地</h1>

      <div className="loginForm">
        <h3>ログインフォーム</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
          <div>
            <label htmlFor="email" className="formElement">
              Eメール
            </label>
            <input id="email" className="inputElement" {...register("email", { required: true })} />
            {errors.email && <div className="errorMessage">入力が必須の項目です</div>}
          </div>
          <div>
            <label htmlFor="password" className="formElement">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              className="inputElement"
              {...register("password", { required: true })}
            />
            {errors.password && <div className="errorMessage">入力が必須の項目です</div>}
          </div>
          <div className="formElement">
            <button type="submit" className="submitButton">送信</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .main {
          background-image: url("24474687_m.jpg");
          background-size: cover;

          min-height: 800px;
        }

        .loginForm {
          display: block;
          width: 250px;
          background-color: white;
          border: 3px solid black;
          border-radius: 30px;
          margin: 0 auto;
          margin-top: 100px;
        }

        .loginForm h3 {
          text-align: center;
          color: black;
          padding-top: 20px;
        }

        h1 {
          text-align: center;
          color: white;
        }

        .formElement {
          display: block;
          margin-top: 8px;
        }

        .formContainer {
          margin-left: 16px;
          margin-bottom: 50px;
        }

        .errorMessage {
          color: red;
        }

        .submitButton {
          width: 90%;
          margin-top: 8px;
        }

        .inputElement {
          width: 87%;
        }

      `}</style>
    </div>
  );
}

export default LoginIndex;
