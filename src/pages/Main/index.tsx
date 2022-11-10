const Root = () => {
  return (
    <>
      <div id="sidebar">
        <h1>라우팅 세팅하기</h1>
        <nav>
          <ul>
            <li>
              <a href={`children`}>하위 페이지 들어가기</a>
            </li>
            <li>
              <a href={`editor`}>에디터 페이지 들어가기</a>
            </li>
            <li>
              <a href={`Home`}>메인 페이지 들어가기</a>
            </li>
            <li>
              <a href={`infinite`}>무한 스크롤 들어가기</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
};
export default Root;
