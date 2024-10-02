import type {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Planify",
    short_name: "Planify",
    description: "Planify app",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },

      {
        src: "/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        src: "/ms-icon-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "/ms-icon-310x310.png",
        sizes: "310x310",
        type: "image/png",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  };
}
