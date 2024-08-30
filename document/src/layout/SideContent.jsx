import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"

const SideContent = ({ parsedHtml }) => {
  const el = parsedHtml;

  const extractTexts = (el) => {
    let texts = [];

    const traverse = (node) => {
      // 댓글에 있는 날짜(숫자) 아닌 경우
      if (node.type === 'span' && node.props.className !== 'nb_date') {
        const text = typeof node.props.children === 'string' ? node.props.children.trim() : '';
        if (text) {
          texts.push(text);
        }
      }
      // 배열인 경우
      if (Array.isArray(node)) {
        node.forEach(traverse);
      }
      // 객체인 경우
      if (node && node.props && node.props.children) {
        traverse(node.props.children);
      }
    };

    traverse(el);
    return texts;
  };

  const texts = extractTexts(el);

  // 텍스트를 h1과 ul > li로 변환
  const renderContent = () => {
    let elements = [];
    let currentList = [];
    let inList = false;

    texts.forEach((text, index) => {
      if (text[0] === '*') {
        // 현재까지의 리스트를 종료하고 <ul>로 감싼 후 추가
        if (inList) {
          elements.push(<ul className="list-items" key={`crrList-${index}`}>{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        // *로 시작하는 텍스트를 <h1>으로 렌더링
        elements.push(<strong className="sub-tit" key={`tit-${index}`}>{text.trim()}</strong>);
      } else if (!isNaN(parseInt(text))) {
        // 숫자 텍스트를 <li>로 추가
        currentList.push(<li key={`li-${index}`}>{text}</li>);
        inList = true;
      }
    });

    // 마지막 리스트가 남아있으면 추가
    if (inList) {
      elements.push(<ul className="list-items" key={`li-last`}>{currentList}</ul>);
    }

    return elements;
  };

  return (
    <Card className="w-[400px] max-[1280px]:hidden border-none side-wrap" >
       <CardHeader>
        <CardTitle className='tit'>목차</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default SideContent