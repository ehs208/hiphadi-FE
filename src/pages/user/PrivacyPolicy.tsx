import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-3xl font-PretendardMedium mb-8 text-gray-100">
          힙하디 개인정보 처리 방침
        </div>

        <div>
          <div className="text-gray-300 mb-6 font-PretendardLight">
            힙하디 (이하 "회사")은 사용자의 개인정보를 중요하게 생각하며, 관련
            법령을 준수하고 있습니다. 본 개인정보 처리 방침은 사용자가 제공하는
            개인정보의 수집, 이용, 보관 및 보호에 관한 내용을 설명합니다.
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              1. 수집하는 개인정보의 항목
            </div>
            <div className="text-gray-300 mb-2 font-PretendardLight">
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
            </div>
            <ul className="list-disc ml-6 text-gray-300 font-PretendardLight">
              <li>IP 주소</li>
              <li>디바이스 정보</li>
              <li>접속 시간</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              2. 개인정보의 수집 목적
            </div>
            <div className="text-gray-300 mb-2 font-PretendardLight">
              회사는 수집한 개인정보를 다음의 목적을 위해 사용합니다:
            </div>
            <ul className="list-disc ml-6 text-gray-300 font-PretendardLight">
              <li>서비스 이용 통계 분석</li>
              <li>서비스 개선 및 사용자 맞춤형 서비스 제공</li>
              <li>고객 문의 및 응대</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              3. 개인정보의 보유 및 이용 기간
            </div>
            <div className="text-gray-300 font-PretendardLight">
              회사는 수집한 개인정보를 서비스 제공 목적이 달성될 때까지
              보유하며, 해당 목적이 달성된 후에는 즉시 파기합니다.
            </div>
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              4. 개인정보의 보호
            </div>
            <div className="text-gray-300 font-PretendardLight">
              회사는 사용자의 개인정보를 안전하게 보호하기 위해 기술적 및 관리적
              조치를 취하고 있습니다. 또한, 개인정보 접근 권한을 제한하여
              내부에서의 무단 접근을 방지합니다.
            </div>
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              5. 사용자 권리
            </div>
            <div className="text-gray-300 font-PretendardLight">
              사용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제를 요구할
              수 있습니다. 이 경우, 회사는 필요한 절차를 안내하여 신속하게
              처리하겠습니다.
            </div>
          </div>

          <div className="mb-8">
            <div className="text-xl font-PretendardRegular mb-4 text-gray-100">
              6. 문의사항
            </div>
            <div className="text-gray-300 font-PretendardLight">
              개인정보 처리와 관련하여 문의사항이 있는 경우, 다음의 연락처로
              문의해 주시기 바랍니다:
            </div>
            <div className="mt-4">
              <div className="text-gray-300 font-PretendardLight">
                이메일:{' '}
                <a
                  href="mailto:ehs122100@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  ehs122100@gmail.com
                </a>
              </div>
              <div className="text-gray-300 font-PretendardLight">힙하디</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
