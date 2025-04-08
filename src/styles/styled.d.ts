import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      success: string;
      error: string;
      text: string;
      muted: string;
      border: string;
    };
    radius: string;
  }
}
