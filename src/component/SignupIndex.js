import axios from 'axios';
import SignupForm from './form/SignupForm';

const baseURL =
  'http://k8cr7e.deta.dev' + process.env.REACT_APP_PORT + '/signup';

export default function SignupIndex() {
  const onSubmitHandler = async (data) => {
    await axios.post(baseURL, data);
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
