#기록 ( 아래는 Server 에서 환경 설정 하기 )
#중요한 점은 순서를 node 업그레이드 -> npm 업그레이드
#curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
#sudo apt install nodejs
#npm install -g npm@latest
#apt install build-essential

# 타입스크립트 뺀 기본 설치 방법

## 기본 설치
```
npm install yarn
yarn install
yarn add react-router-dom
yarn add -D tailwindcss postcss autoprefixer
yarn tailwind init -p
yarn add lucide-react
yarn add axios
yarn add html-react-parser
```

## shadcn-ui 설치

1. jsconfig.json 생성

```

{
	"compilerOptions": {
			"baseUrl": ".",
			"paths": {
				"@/*": [
					"./src/*"
				]
			}
	}
}

``` 
2. vite.config.js 수정 (__dirname 오류)

```
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

3. npx shadcn-ui@latest init

설치 파일 경로

src/assets/css/globals.css

@/components/shadcn

4. 컴포넌트 설치
```
npx shadcn-ui@latest add -a // 컴포넌트 전체 설치
npx shadcn-ui@latest add [컴포넌트] // 컴포넌트 개별 설치
```

## 다크 모드 

파일 참고 경로(파일 추가)

\src\components\shadcn\mode-toggle.jsx

\src\components\shadcn\theme-provider.jsx

## 오류
Unknown at rule @tailwind css(unknownAtRules) 오류

@tailwind base;
@tailwind components; 
@tailwind utilities;

=> 
vs code 확장프로그램 설치
PostCSS Language Support 

## 테마 참고
<https://themes.fkaya.dev/>

<https://gradient.page/tools/shadcn-ui-theme-generator>

## 아이콘 참고
<https://lucide.dev/icons/>

## 차트 참고
<https://recharts.org/en-US/>

## ui/shadcn 공식 문서 참고
<https://ui.shadcn.com/docs/installation>

