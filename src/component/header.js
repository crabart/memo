function Header() {
  return (
    <header>
      <div className="headerTitle">メモアプリケーションテスト</div>

      <div className="linkHeader">
        <a href="/logout">ログアウト</a>
      </div>

      <style jsx="true">{`
        header {
          height: 100px;
          background-color: #ffeddb;
        }

        .headerTitle {
          float: left;
          font-size: 24px;
          margin: 30px 20px;
        }

        .linkHeader {
          float: right;
          margin-top: 30px;
        }
      `}</style>
    </header>
  );
}

export default Header;
