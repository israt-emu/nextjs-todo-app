import {darkDefaultTheme, lightDefaultTheme, Theme} from "@blocknote/mantine";

// Base theme
export const lightGrayTheme = {
  colors: {
    editor: {
      text: "#222",
      background: "transparent",
    },
    menu: {
      text: "#222",
      background: "#D1D5DB",
    },
    tooltip: {
      text: "#222",
      background: "#D1D5DB",
    },
    hovered: {
      text: "#000",
      background: "#E5E7EB",
    },
    selected: {
      text: "#111",
      background: "#D1D5DB",
    },
    disabled: {
      text: "#6B7280",
      background: "#E5E7EB",
    },
    shadow: "#D1D5DB",
    border: "#6B7280",
    sideMenu: "#bababa",
    highlights: lightDefaultTheme.colors!.highlights,
  },
  borderRadius: 4,
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;
