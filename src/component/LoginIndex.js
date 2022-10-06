import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './form/LoginForm';

const baseURL = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL + '/signin'
  : 'https://k8cr7e.deta.dev:3000/signin';

function LoginIndex() {
  const navigate = useNavigate();
  const onSubmitHandler = (data) => {
    axios
      .post(baseURL, data)
      .then((dat) => {
        navigate('/');
      })
      .catch((dat) => {
        const body = dat.response.data;
        navigate('/login?code=' + body.code);
      });
  };

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get('code');

  let message;
  let serverError;
  if (code) {
    if (code === '200') {
      message = 'メールアドレスとパスワードが一致しません';
    } else {
      serverError = 'サーバーでエラーが発生しました';
    }
  }

  return (
    <div className="main">
      <div className="title">
        <h1>メモアプリケーションテストへようこそ</h1>
      </div>
      {serverError ? <h3>{serverError}</h3> : <></>}

      <LoginForm
        title={'Sign In'}
        onSubmitCallback={onSubmitHandler}
        message={message}
      />

      <style jsx>{`
        .main {
          background-image: url('24474687_m.jpg');
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

export default LoginIndex;
