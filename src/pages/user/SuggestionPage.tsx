import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createSuggestionAPI } from '@api/user/suggestionAPI';
import { CheckCircle } from 'lucide-react';

const MAX_LENGTH = 500;

type SubmitState = 'idle' | 'submitting' | 'success';

const SuggestionPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async () => {
    const trimmed = content.trim();
    if (!trimmed) {
      setError('건의 내용을 입력해주세요.');
      return;
    }

    setError('');
    setSubmitState('submitting');

    try {
      await createSuggestionAPI(trimmed);
      setSubmitState('success');
      setContent('');
    } catch (err) {
      const message = err instanceof Error ? err.message : '건의 제출 중 오류가 발생했습니다.';
      setError(message);
      setSubmitState('idle');
    }
  }, [content]);

  const handleReset = useCallback(() => {
    setContent('');
    setSubmitState('idle');
    setError('');
  }, []);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_LENGTH) {
        setContent(value);
        if (error) setError('');
      }
    },
    [error],
  );

  return (
    <div className="min-h-screen bg-lounge-bg text-lounge-text">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center text-sm font-PretendardLight text-lounge-text-secondary hover:text-lounge-gold transition-colors duration-300 mb-6"
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          메뉴로 돌아가기
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-PretendardBold mb-2 text-lounge-text tracking-wide">
          익명 건의
        </h1>
        <div className="w-12 h-0.5 bg-lounge-gold mb-6" />

        {/* Description */}
        <div className="bg-lounge-card/60 rounded-lg p-5 mb-8 border border-lounge-border/50">
          <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base">
            힙하디에 전하고 싶은 이야기가 있으신가요? 서비스 개선, 메뉴 제안, 분위기
            등 자유롭게 건의해주세요. 모든 건의는 익명으로 전달됩니다.
          </p>
        </div>

        {submitState === 'success' ? (
          /* Success State */
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-16 h-16 rounded-full bg-lounge-gold/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-lounge-gold" />
            </div>
            <h2 className="text-xl font-PretendardBold mb-3 text-lounge-text">
              건의가 접수되었습니다
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight mb-8 text-sm sm:text-base">
              소중한 의견 감사합니다. 더 나은 힙하디가 되겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-lounge-gold text-lounge-bg font-PretendardSemiBold rounded-lg hover:bg-lounge-gold-light transition-colors duration-300 text-sm"
              >
                다른 건의하기
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-lounge-border text-lounge-text-secondary font-PretendardRegular rounded-lg hover:border-lounge-gold/30 hover:text-lounge-gold transition-all duration-300 text-sm text-center"
              >
                메뉴로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="relative">
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="건의 내용을 입력해주세요..."
                rows={6}
                className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-4 text-sm sm:text-base text-lounge-text font-PretendardRegular placeholder-lounge-text-muted/50 focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 resize-none"
                disabled={submitState === 'submitting'}
              />
              <div className="flex justify-end mt-2">
                <span
                  className={`text-xs font-PretendardLight ${
                    content.length >= MAX_LENGTH
                      ? 'text-red-400'
                      : 'text-lounge-text-muted'
                  }`}
                >
                  {content.length} / {MAX_LENGTH}
                </span>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-PretendardRegular mt-2">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitState === 'submitting' || !content.trim()}
              className="mt-4 w-full sm:w-auto px-8 py-3 bg-lounge-gold text-lounge-bg font-PretendardSemiBold rounded-lg hover:bg-lounge-gold-light transition-colors duration-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitState === 'submitting' ? '제출 중...' : '건의 제출'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-lounge-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/"
              className="text-sm font-PretendardLight text-lounge-text-secondary hover:text-lounge-gold transition-colors duration-300"
            >
              메뉴로 돌아가기
            </Link>
            <span className="text-xs font-PretendardExtraLight text-lounge-text-muted">
              &copy; 2026 힙하디. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
