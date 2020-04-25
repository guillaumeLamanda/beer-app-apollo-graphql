import { ThemeType, grommet } from "grommet";
import { deepMerge } from "grommet/utils";

export const beerTheme: ThemeType = {
  global: {
    colors: {
      brand: {
        dark: "#f4e285",
        light: "#f6a34c",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    active: {
      color: "active-text",
    },
    font: {
      family: "Montserrat, Roboto, sans-serif",
      size: "14px",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    spacing: "1em",
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  heading: {
    font: {
      family: "futura",
    },
  },
  formField: {
    border: {
      color: "border",
      side: "bottom",
      size: "xsmall",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    margin: {
      bottom: "small",
    },
  },
  anchor: {
    color: {
      light: "brand",
      dark: "text-strong",
    },
  },
};

export const theme = deepMerge(grommet, beerTheme);
