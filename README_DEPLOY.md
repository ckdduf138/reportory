# Reportory - 일일 업무 보고서 플랫폼

![Reportory](./public/images/favicon.svg)

## 📋 프로젝트 소개

Reportory는 하루의 기록을 쉽고 간편하게 남기고, 분석해주는 일상 기록 플랫폼입니다. 
할일 관리, 감정 추적, 생산성 분석을 통해 더 나은 하루를 만들어보세요.

## ✨ 주요 기능

- **할일 관리**: 직관적인 UI로 할일을 추가, 수정, 완료 처리
- **카테고리 관리**: 맞춤형 카테고리로 할일을 체계적으로 분류
- **생산성 분석**: 완료율, 트렌드, 카테고리별 통계 제공
- **반응형 디자인**: 모바일과 데스크톱 모두 최적화
- **다크모드 지원**: 사용자 선호에 맞는 테마 제공
- **PWA 지원**: 오프라인에서도 사용 가능

## 🚀 기술 스택

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **상태 관리**: React Hooks, Context API
- **아이콘**: Lucide React
- **빌드 도구**: Create React App
- **배포**: Vercel

## 🔧 설치 및 실행

### 로컬 개발 환경

```bash
# 프로젝트 클론
git clone https://github.com/your-username/reportory.git

# 디렉토리 이동
cd reportory

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 분석
npm run analyze
```

## 📱 PWA 지원

이 애플리케이션은 Progressive Web App(PWA)로 개발되어 다음 기능을 지원합니다:

- 오프라인 사용 가능
- 홈 화면에 설치 가능
- 푸시 알림 (향후 지원 예정)
- 빠른 로딩 속도

## 🌐 배포

### Vercel 배포

1. Vercel 계정 생성 및 로그인
2. GitHub 저장소 연결
3. 자동 배포 설정 완료

```bash
# Vercel CLI 사용 배포
npm install -g vercel
vercel
```

### 환경 변수

배포 시 다음 환경 변수를 설정해주세요:

```env
REACT_APP_API_URL=your-api-url
REACT_APP_VERSION=1.0.0
```

## 📊 SEO 최적화

- **메타 태그**: 페이지별 동적 메타 태그 설정
- **구조화된 데이터**: Schema.org 마크업 적용
- **사이트맵**: 자동 생성된 XML 사이트맵
- **로봇 텍스트**: 검색 엔진 최적화
- **Open Graph**: 소셜 미디어 공유 최적화

## 📈 성능 최적화

- **레이지 로딩**: 이미지 및 컴포넌트 지연 로딩
- **코드 스플리팅**: 동적 import를 통한 번들 크기 최적화
- **캐싱 전략**: Service Worker를 통한 캐싱
- **압축**: Gzip/Brotli 압축 적용

## 📞 지원 및 문의

- **이메일**: support@reportory.com
- **GitHub Issues**: [여기서 이슈 제기](https://github.com/your-username/reportory/issues)
- **문서**: [공식 문서](https://reportory.com/docs)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조해주세요.

## 🤝 기여하기

Reportory는 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by Reportory Team
