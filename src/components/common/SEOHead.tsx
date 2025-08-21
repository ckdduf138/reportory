import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "무료 할일 목록 앱 Reportory | 최고의 투두 리스트 관리 도구",
  description = "무료 할일 목록 앱 Reportory! 투두 리스트, 업무 관리, 일정 관리를 한 번에. 카테고리별 할일 분류, 진행률 분석, 생산성 향상을 위한 최고의 할일 관리 도구입니다.",
  keywords = "할일 목록, 할일 관리, 투두 리스트, todo list, 할일 앱, 업무 관리, 일정 관리, 생산성 도구, 프로젝트 관리, 무료 할일 앱, 개인 성장, 일상 기록, 습관 추적, 할일 체크리스트, 업무 효율성",
  canonical,
  ogImage = "/images/favicon.svg"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Reportory Team');
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Reportory', true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};
