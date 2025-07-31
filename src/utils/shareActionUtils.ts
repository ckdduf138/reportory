import { toast } from "../components/ui/toastContainer";

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사되었습니다!");
  } catch (error) {
    toast.error("클립보드 복사에 실패했습니다.");
    throw error;
  }
};

export const downloadAsText = (text: string, filename: string): void => {
  try {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("파일이 다운로드되었습니다!");
  } catch (error) {
    toast.error("파일 다운로드에 실패했습니다.");
    throw error;
  }
};

export const shareToEmail = (subject: string, body: string): void => {
  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`);
  } catch (error) {
    toast.error("이메일 공유에 실패했습니다.");
    throw error;
  }
};

export const shareViaWebAPI = async (
  title: string,
  text: string
): Promise<void> => {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
      });
    } else {
      toast.info("이 브라우저에서는 지원되지 않습니다.");
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      toast.error("공유에 실패했습니다.");
    }
    throw error;
  }
};
