import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getTokenMetadataMap() {
    return {
        // "Dj2CwMF3GM7mMT5hcyGXKuYSQ2kQ5zaVCkA1zX1qaTva": {
        //     tokenAddress: "2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH",
        //     tokenSymbol: "USDG",
        // },
        "FDsf8sj6SoV313qrA91yms3u5b3P4hBxEPvanVs8LtJV": {
            tokenAddress: "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA",
            tokenSymbol: "USDS",
        },
        "CCKtUs6Cgwo4aaQUmBPmyoApH2gUDErxNZCAntD6LYGh": {
            tokenAddress: "So11111111111111111111111111111111111111112",
            tokenSymbol: "SOL",
        },
        // "8UEiPmgZHXXEDrqLS3oiTxQxTbeYTtPbeMBxAd2XGbpu": {
        //     tokenAddress: "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
        //     tokenSymbol: "PYUSD",
        // },
        // "GJCi1uj3kYPZ64puA5sLUiCQfFapxT2xnREzrbDzFkYY": {
        //     tokenAddress: "he1iusmfkpAdwvxLNGV8Y1iSbj4rUy6yMhEA3fotn9A",
        //     tokenSymbol: "hSOL",
        // },
        // "8LaUZadNqtzuCG7iCvZd7d5cbquuYfv19KjAg6GPuuCb": {
        //     tokenAddress: "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v",
        //     tokenSymbol: "jupSOL",
        // },
        // "BeNBJrAh1tZg5sqgt8D6AWKJLD5KkBrfZvtcgd7EuiAR": {
        //     tokenAddress: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
        //     tokenSymbol: "UXD",
        // },
        // "HmpMfL8942u22htC4EMiWgLX931g3sacXFR6KjuLgKLV": {
        //     tokenAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        //     tokenSymbol: "USDT",
        // },
        // "2s37akK2eyBbp8DZgCm7RtsaEz8eJP3Nxd4urLHQv7yB": {
        //     tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        //     tokenSymbol: "USDC",
        // },
        // "22DcjMZrMwC5Bpa5AGBsmjc5V9VuQrXG6N9ZtdUNyYGE": {
        //     tokenAddress: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        //     tokenSymbol: "mSOL",
        // },
        // "DMoqjmsuoru986HgfjqrKEvPv8YBufvBGADHUonkadC5": {
        //     tokenAddress: "LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp",
        //     tokenSymbol: "LST",
        // },
        // "Bohoc1ikHLD7xKJuzTyiTyCwzaL5N7ggJQu75A8mKYM8": {
        //     tokenAddress: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
        //     tokenSymbol: "JitoSOL",
        // },
    };
}
