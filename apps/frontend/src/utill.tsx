export const formatNumberWithCommas = (number: number) => {
  return new Intl.NumberFormat('ko-KR').format(number)
}
