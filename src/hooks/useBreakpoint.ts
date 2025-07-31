import { useState, useEffect } from "react";

type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<BreakpointKey, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useBreakpoint = (breakpoint: BreakpointKey): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoints[breakpoint]}px)`;
    const media = window.matchMedia(query);

    // 초기 상태 설정
    setMatches(media.matches);

    // 리스너 추가
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [breakpoint]);

  return matches;
};

export const useIsMobile = (): boolean => {
  return !useBreakpoint("md");
};

export const useIsTablet = (): boolean => {
  const isMd = useBreakpoint("md");
  const isLg = useBreakpoint("lg");
  return isMd && !isLg;
};

export const useIsDesktop = (): boolean => {
  return useBreakpoint("lg");
};

// 반응형 값 반환 훅
export const useResponsiveValue = <T>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
}): T => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  if (isDesktop && values.desktop !== undefined) {
    return values.desktop;
  }
  if (isTablet && values.tablet !== undefined) {
    return values.tablet;
  }
  return values.mobile;
};
