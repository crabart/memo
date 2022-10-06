import { useForm } from 'react-hook-form';

function LoginForm({ title, onSubmitCallback, message }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="loginForm">
        <div className="loginFromTitle">
          <h3>{title}</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitCallback)}
          className="formContainer"
        >
          <div>
            <label htmlFor="email" className="formLabel">
              Eメール
            </label>
            <input
              id="email"
              className="inputElement"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="errorMessage">入力が必須の項目です</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="formLabel">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              className="inputElement"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <div className="errorMessage">入力が必須の項目です</div>
            )}
          </div>
          <div className="formLabel">
            <button type="submit" className="submitButton">
              送信
            </button>
          </div>
          {message && <div className="errorMessage">{message}</div>}
        </form>
      </div>
      <style jsx>{`
        .loginForm {
          display: block;
          width: 250px;
          background-color: white;
          border: 3px solid black;
          border-radius: 30px;
          margin: 0 auto;
        }

        .loginFromTitle {
          text-align: center;
          color: black;
          padding-top: 20px;
        }

        .formContainer {
          margin-left: 16px;
          margin-bottom: 50px;
        }

        .formLabel {
          display: block;
          margin-top: 8px;
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
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
}

export default LoginForm;
