/**
 * 만원 단위로 가격을 축약하여 표시
 * @param price 원 단위 가격 (예: 8000, 90000)
 * @returns 만원 단위 문자열 (예: "0.8", "9.0")
 */
export function formatPriceShort(price: number): string {
  const inManwon = price / 10000;
  return inManwon.toFixed(1);
}

/**
 * 싱글/바틀 가격을 표시 형식으로 변환
 * 둘 다 있음: "0.8 / 9.0(B)"
 * 싱글만: "0.8"
 * 바틀만: "9.0(B)"
 * 둘 다 없음: "설명참조"
 */
export function formatPriceDisplay(
  singlePrice: number | null | undefined,
  bottlePrice: number | null | undefined
): string {
  const hasSingle = singlePrice != null && singlePrice > 0;
  const hasBottle = bottlePrice != null && bottlePrice > 0;

  if (hasSingle && hasBottle) {
    return `${formatPriceShort(singlePrice)} / ${formatPriceShort(bottlePrice)}(B)`;
  }
  if (hasSingle) {
    return formatPriceShort(singlePrice);
  }
  if (hasBottle) {
    return `${formatPriceShort(bottlePrice)}(B)`;
  }
  return '설명참조';
}

/**
 * 가격 유형 결정
 */
export type PriceType = 'single' | 'bottle';

/**
 * 상품의 가격 유형 옵션 반환
 */
export function getPriceOptions(
  singlePrice: number | null | undefined,
  bottlePrice: number | null | undefined
): PriceType[] {
  const options: PriceType[] = [];
  if (singlePrice != null && singlePrice > 0) {
    options.push('single');
  }
  if (bottlePrice != null && bottlePrice > 0) {
    options.push('bottle');
  }
  return options;
}

/**
 * 장바구니 cartKey 생성
 */
export function createCartKey(productId: number, priceType: PriceType): string {
  return `${productId}-${priceType}`;
}
