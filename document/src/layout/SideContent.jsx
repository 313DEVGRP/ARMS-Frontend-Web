import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"

const SideContent = ({ parsedHtml }) => {
  const el = parsedHtml;

  // 특정 기호가 포함된 텍스트를 추출
  const extractTexts = (element) => {
    let texts = [];

    const traverse = (node) => {
 
      if (node.type === 'b') {
        const text = typeof node.props.children === 'string' ? node.props.children.trim() : '';
        // 특정 문자 추출 
        if (text[0] === '■' || text[0] === '●') {
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

    traverse(element);
    return texts;
  };

  const specificTexts = extractTexts(el);

  return (
    <Card className="w-[400px] max-[1280px]:hidden border-none side-wrap" >
       <CardHeader>
        <CardTitle>목차</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-none:mt-4">
          {specificTexts.map((text, index) => (
            <SideContentLi key={index} text={text} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const SideContentLi = ({ text, index }) => {
  return <li key={index}>{text}</li>
};

export default SideContent