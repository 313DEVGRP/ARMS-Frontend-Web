import { useEffect, useReducer } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';  // html -> jsx 테스트
import SideContent from '@/layout/SideContent';
// 리액트 리듀서를 사용하여 코드 repeat을 줄이고 
// 재사용이 가능하도록 만들었습니다.
// 액션 타입 설정 -- Define action types --
const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

// 리듀서 함수 -- Reducer function --
function reducer(state, action) {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, htmlContent: action.payload, sideContent: <SideContent parsedHtml={action.payload} />, error: null };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// 이니셜 스테이트 -- Initial state --
const initialState = {
  sideContent: null,
  htmlContent: null,
  loading: true,
  error: null,
};

// Custom hook to fetch data
// 커스텀 훅 사용으로 Axios를 이용한 API 데이터로 패치 
export function useFetchData(wrId) { // 페이지 id 로 데이터 로드
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async (wrId) => {
      dispatch({ type: FETCH_START });
      try {
        const response = await axios.get(`/php/gnuboard5/bbs/board_view.php?bo_table=manual&wr_id=${wrId}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          crossDomain: true,
        });
        const htmlString = response.data;
        const parsedHtml = parse(htmlString, {
          replace: (domNode) => {
          // console.log(domNode.name === "section")
           //  console.log(domNode)
            if (domNode.name === "img") {
                const savedSrc = domNode.attribs.src
                return ( <img src={savedSrc} 
                          // style={{ width: 300 }}
                          // onError={e => {
                          // return e.target.src = import.meta.env.VITE_ASSET_URL + savedSrc;
                          // }} 
                   />
                 )}
              // if (domNode.name === "header") {
              //   return <div />
              // }   
              if (domNode.name === "header") {
                // Iterate over the children of the header
                domNode.children.forEach((child) => {
                  if (child.name === "h4") {
                    // Modify the <h4> element as needed
                    child.attribs.class += ' hidden'
                  }
                })
              }   

              if (domNode.name === "section" && domNode.attribs.id === "bo_v_info") {
                return <div />
              }   
              if (domNode.name === "div" && domNode.attribs.id === "bo_v_top") {
                return <div />
              }   
              if (domNode.name === "html" && domNode.attribs.lang.toLowerCase() === "ko") {
                return domNode.name = "div"
              }
              if (domNode.name === "body") {
                return domNode.name = "div"
              }
              if (domNode.name === "span" && domNode.attribs.class === "spinner") {
                // Add the "hidden" class 하단에 로더 문구 숨김
                domNode.attribs.class += ' hidden';
                // Return the updated div 
                return domNode;
              }
              if (domNode.name === "div" && domNode.attribs.id === "topicon") { 
                 // Add the "hidden" class 하단에 topicon 숨김
                 domNode.attribs.class += ' hidden';
                 return domNode;
              }  
              if (domNode.name === "span" && domNode.attribs.class === "cmt_more") { 
                 return <span />
              }  
          },
        });
        dispatch({ type: FETCH_SUCCESS, payload: parsedHtml });
      } catch (error) {
      
          console.log(error);
          dispatch({ type: FETCH_ERROR, payload: error.message });
        }
    }
    if (wrId) {
      fetchData(wrId); // id 불러오기
    }
 }, [wrId]);

  return state;
}