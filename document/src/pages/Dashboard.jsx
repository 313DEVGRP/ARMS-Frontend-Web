import { Loader } from "lucide-react"
import { useFetchData } from '../reducer/linkFetchReducer';
// 도큐먼트의 가장 메인 페이지 입니다.
// 루트 = '/'
// 
function Dashboard() {
  const  wr_id  = 16; // 게시판 or 페이지 id
  const { loading, htmlContent, sideContent, error } = useFetchData(wr_id);
  //
  //  html -> jsx 로 데이터 Axios로 불러오는 패치는 
  //  useFetchData로 이동 했습니다.
  // 'reducer/linkFetchReducer' 파일을 확인 하세요.
  //
  return (
     <>
       {/* 테스트 */}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className='loading'/>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
            <div>
              {sideContent}
              {htmlContent}
            </div>
        )}
     </>
  )
}

export default Dashboard