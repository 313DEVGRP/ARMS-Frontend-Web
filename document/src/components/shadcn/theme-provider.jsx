import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// 테마
const allowedThemes = ['dark', 'light'];

// 기본 상태와 Context 생성
const ThemeProviderContext = createContext({
  theme: 'light',
  setTheme: () => null,
});

// ThemeProvider 컴포넌트
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  ...props
}) {
  // 로컬 저장소에서 테마를 읽거나 기본 테마를 설정
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  // 테마가 변경될 때마다 문서 루트 업데이트
  useEffect(() => {
    const root = window.document.documentElement;

    root.setAttribute('style', '');
    root.classList.remove('light', 'dark');

    if (theme === 'dark') {
      root.setAttribute('style', 'color-scheme: dark');
    }

    root.classList.add(theme);
  }, [theme]);

  // Context 값 제공
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// PropTypes 유효성 검사 설정
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // 자식 요소
  defaultTheme: PropTypes.oneOf(allowedThemes), // 허용된 테마 중 하나
  storageKey: PropTypes.string, // 로컬 저장소 키
};

// 테마 Context를 사용하는 커스텀 훅
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
