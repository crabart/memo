import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupForm from './form/SignupForm';

const baseURL = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL + '/signup'
  : 'https://k8cr7e.deta.dev:3000/signup';

export default function SignupIndex() {
  const navigate = useNavigate();
  const onSubmitHandler = (data) => {
    axios
      .post(baseURL, data)
      .then((dat) => {
        navigate('/');
      })
      .catch((dat) => {
        const body = dat.response.data;
        navigate('/signup?code=' + body.code);
      });
  };

  return (
    <div className="main">
      <div className="title">
        <h1>メモアプリケーションテストへようこそ</h1>
      </div>

      <SignupForm title={'Sign Up'} onSubmitCallback={onSubmitHandler} />

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
