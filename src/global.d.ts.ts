import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      textSecondary: string;
      error: string;
    };
    radius: string;
  }
}

declare global {
  interface Photo {
    id: string;
    url: string;
    photographer: string;
    photographer_url: string;
    alt: string;
    src: {
      original: string;
      large2x: string;
      large: string;
      medium: string;
      small: string;
      portrait: string;
      landscape: string;
      tiny: string;
    };
  }
}

export {};
