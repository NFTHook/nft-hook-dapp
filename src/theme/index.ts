import { css, DefaultTheme } from "styled-components";

export const device = {
    smw: 640,
    mdw: 768,
    lgw: 1024,
    xlw: 1280,
    xxlw: 1536,
};

export const theme: DefaultTheme = {
    media: {
        sm: (...args: [any]) => css`
            @media (max-width: ${device.smw}px) {
                ${css(...args)};
            }
        `,
        md: (...args: [any]) => css`
            @media (max-width: ${device.mdw}px) {
                ${css(...args)};
            }
        `,
        lg: (...args: [any]) => css`
            @media (max-width: ${device.lgw}px) {
                ${css(...args)};
            }
        `,
        xl: (...args: [any]) => css`
            @media (max-width: ${device.xlw}px) {
                ${css(...args)};
            }
        `,
        xxl: (...args: [any]) => css`
            @media (max-width: ${device.xxlw}px) {
                ${css(...args)};
            }
        `,
    },
};
