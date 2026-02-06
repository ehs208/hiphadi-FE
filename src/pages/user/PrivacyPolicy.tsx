import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          개인정보 처리방침
        </h1>
        <div className="w-12 h-0.5 bg-lounge-gold mb-6" />
        <p className="text-sm font-PretendardLight text-lounge-text-muted mb-8">
          시행일: 2026년 1월 1일 | 최종 수정일: 2026년 2월 2일
        </p>

        {/* Introduction */}
        <div className="bg-lounge-card/60 rounded-lg p-5 mb-8 border border-lounge-border/50">
          <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base">
            힙하디(이하 "업장")는 「개인정보 보호법」 제30조에 따라 이용자의
            개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
            있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립 및
            공개합니다.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제1조 (개인정보의 처리 목적)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 회원가입 및 로그인 기능을 제공하지 않으며, 이용자는 별도의
              개인정보 입력 없이 디지털 메뉴판을 조회할 수 있습니다. 다만,
              서비스 운영 및 개선을 위해 다음 목적으로 최소한의 정보를
              수집합니다.
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>메뉴 클릭 통계 분석 및 서비스 이용 현황 파악</span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>서비스 개선 및 메뉴 운영 최적화</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제2조 (수집하는 개인정보 항목 및 수집 방법)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 서비스 이용 과정에서 다음 정보를 수집합니다.
            </p>
            <div className="bg-lounge-surface rounded-lg p-4 border border-lounge-border/50">
              <div className="mb-3">
                <span className="text-sm font-PretendardMedium text-lounge-text">
                  수집 항목
                </span>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm">
                  <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                  <span>메뉴 클릭 기록 (어떤 메뉴를 조회했는지에 대한 통계)</span>
                </li>
                <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm">
                  <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                  <span>익명 건의사항 (이용자가 자발적으로 입력한 텍스트)</span>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-lounge-border/50">
                <span className="text-sm font-PretendardMedium text-lounge-text">
                  수집 방법
                </span>
                <p className="text-lounge-text-secondary font-PretendardLight text-sm mt-1">
                  서비스 이용 과정에서 자동 생성되는 통계 데이터 및 이용자의 자발적 입력
                </p>
              </div>
            </div>
            <p className="text-lounge-text-muted font-PretendardLight text-xs mt-3">
              * 업장는 이름, 연락처, 이메일, IP 주소, 디바이스 정보 등 이용자를
              직접 식별할 수 있는 개인정보를 수집하지 않습니다.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제3조 (개인정보의 처리 및 보유 기간)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 수집한 개인정보를 다음의 기간 동안 보유 및 이용합니다.
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  <span className="text-lounge-text font-PretendardRegular">
                    메뉴 클릭 통계 데이터:
                  </span>{' '}
                  수집일로부터 1년간 보유 후 파기
                </span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  <span className="text-lounge-text font-PretendardRegular">
                    익명 건의사항:
                  </span>{' '}
                  확인 후 삭제 처리
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base">
              업장는 이용자의 개인정보를 제1조에서 명시한 범위 내에서만
              처리하며, 이용자의 동의 없이 제3자에게 제공하지 않습니다. 다만,
              다음의 경우에는 예외로 합니다.
            </p>
            <ul className="space-y-2 ml-1 mt-3">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제5조 (개인정보의 파기 절차 및 방법)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우,
              지체 없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  <span className="text-lounge-text font-PretendardRegular">
                    파기 절차:
                  </span>{' '}
                  보유 기간이 만료된 개인정보는 별도의 DB로 옮겨 일정 기간 후
                  파기하거나 즉시 파기합니다.
                </span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  <span className="text-lounge-text font-PretendardRegular">
                    파기 방법:
                  </span>{' '}
                  전자적 파일 형태의 정보는 기록을 재생할 수 없도록 기술적
                  방법을 사용하여 삭제합니다.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제6조 (쿠키의 운용 및 거부)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 방문 빈도 분석 등을 위해 쿠키(Cookie)를 사용할 수 있습니다.
              이용자는 웹 브라우저 설정을 통해 쿠키의 저장을 거부할 수 있으나,
              이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
            </p>
            <div className="bg-lounge-surface rounded-lg p-4 border border-lounge-border/50">
              <span className="text-sm font-PretendardMedium text-lounge-text">
                쿠키 설정 거부 방법
              </span>
              <ul className="space-y-1.5 mt-2">
                <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm">
                  <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                  <span>Chrome: 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터</span>
                </li>
                <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm">
                  <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                  <span>Safari: 설정 &gt; 개인정보 보호 &gt; 쿠키 및 웹사이트 데이터</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제7조 (개인정보의 안전성 확보 조치)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>관리자 계정에 대한 접근 권한 제한 및 비밀번호 관리</span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>SSL/TLS 암호화 통신을 통한 데이터 전송 보안</span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>서버 접근 통제 및 보안 프로그램 설치 및 갱신</span>
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제8조 (이용자의 권리와 행사 방법)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base">
              이용자는 언제든지 수집된 개인정보에 대해 열람, 정정, 삭제,
              처리정지를 요구할 수 있습니다. 아래 연락처로 이메일을 통해
              요청하시면, 지체 없이 조치하겠습니다.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제9조 (개인정보 보호책임자)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              업장는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 이용자의
              불만 처리 및 피해 구제를 위해 아래와 같이 개인정보
              보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-lounge-surface rounded-lg p-4 border border-lounge-border/50">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-PretendardMedium text-lounge-text w-20 flex-shrink-0">
                    업장명
                  </span>
                  <span className="font-PretendardLight text-lounge-text-secondary">
                    힙하디 (Hiphadi)
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-PretendardMedium text-lounge-text w-20 flex-shrink-0">
                    이메일
                  </span>
                  <a
                    href="mailto:ehs122100@gmail.com"
                    className="font-PretendardLight text-lounge-gold hover:text-lounge-gold-light transition-colors duration-300"
                  >
                    ehs122100@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제10조 (권익침해 구제 방법)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base mb-3">
              이용자는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에
              분쟁 해결이나 상담을 신청할 수 있습니다.
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  개인정보분쟁조정위원회:{' '}
                  <span className="text-lounge-text-muted">(국번없이) 1833-6972</span>
                </span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  개인정보침해신고센터:{' '}
                  <span className="text-lounge-text-muted">(국번없이) 118</span>
                </span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  대검찰청 사이버수사과:{' '}
                  <span className="text-lounge-text-muted">(국번없이) 1301</span>
                </span>
              </li>
              <li className="flex items-start text-lounge-text-secondary font-PretendardLight text-sm sm:text-base">
                <span className="text-lounge-gold mr-2 mt-0.5 flex-shrink-0">-</span>
                <span>
                  경찰청 사이버수사국:{' '}
                  <span className="text-lounge-text-muted">(국번없이) 182</span>
                </span>
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-lg font-PretendardSemiBold mb-3 text-lounge-gold-light border-b border-lounge-border pb-2">
              제11조 (개인정보 처리방침 변경)
            </h2>
            <p className="text-lounge-text-secondary font-PretendardLight leading-relaxed text-sm sm:text-base">
              이 개인정보 처리방침은 2026년 1월 1일부터 적용됩니다. 법령 및
              방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는
              변경사항의 시행 7일 전부터 웹사이트를 통하여 공지하겠습니다.
            </p>
          </section>
        </div>

        {/* Footer divider and back link */}
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

export default PrivacyPolicy;
