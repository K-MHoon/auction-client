export const KRW = (num) =>
    Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    }).format(num);
