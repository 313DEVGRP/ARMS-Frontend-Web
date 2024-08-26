import { useEffect, useState } from 'react'
import { Loader } from "lucide-react"
import axios from 'axios'
import parse from 'html-react-parser' // html -> jsx 테스트

function Dashboard() {
  const [htmlContent, setHtmlContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/&wr_id=16')
      .then(res => {
        const htmlString = res.data
        setHtmlContent(parse(htmlString, {
          replace: (domNode) => {
            // 이미지 경로 변환
            if (domNode.name === "img") {
              const baseUrl = 'http://313.co.kr/php';
              const getImgSrc = domNode.attribs.src;
              const repalceImgSrc = getImgSrc.split('/php');
              const imgSrc = baseUrl+repalceImgSrc[1];
              return <img src={imgSrc} alt={domNode.attribs.alt} style={{maxWidth : 100+'%'}} />;
            }
          },
        }))
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); // 데이터 로드 완료 후 로딩 상태 업데이트
  }, []);

  return (
     <>
       {/* 테스트 */}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className='loading'/>
          </div>
        ) : (
          htmlContent
        )}
     </>
  )
}

export default Dashboard