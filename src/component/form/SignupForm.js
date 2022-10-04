import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function SignupForm({ title, onSubmitCallback, message }) {
  const [errorMessage, setErrorMessage] = useState(message);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onBlur, onChange, ref, name } = {
    ...register('email', { required: '入力が必須の項目です' }),
  };

  const emailOnChange = (e) => {
    setErrorMessage('');
    message = '';
    onChange(e);
  };

  useEffect(() => {
    console.log('useEffect');
    setErrorMessage(message);
  }, [message]);

  return (
    <>
      <div className="signupForm">
        <div className="signupFormTitle">
          <h3>{title}</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitCallback)}
          className="formContainer"
        >
          <div>
            <label htmlFor="name" className="formLabel">
              ユーザー名
            </label>
            <input
              id="name"
              className="inputElement"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <div className="errorMessage">入力が必須の項目です</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="formLabel">
              Eメール
            </label>
            <input
              id="email"
              className="inputElement"
              onBlur={onBlur}
              ref={ref}
              name={name}
              onChange={emailOnChange}
            />
            {errors.email && (
              <div className="errorMessage">{errors.email.message}</div>
            )}
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
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
        </form>
      </div>
      <style jsx>{`
        .signupForm {
          display: block;
          width: 250px;
          background-color: white;
          border: 3px solid black;
          border-radius: 30px;
          margin: 0 auto;
        }

        .signupFormTitle {
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

export default SignupForm;
