import Webamp from "webamp";
import fs from "fs";
import path from "path";

const getInitialTracks = () => {
  return new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, 'mp3s');

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject('Unable to scan directory: ' + err);
      }

      const initialTracks = files.map(file => ({
        metaData: {
          artist: "Unknown Artist",
          title: path.parse(file).name,
        },
        url: `/mp3s/${file}`,
        duration: 0, // You might want to replace this with the actual duration
      }));

      resolve(initialTracks);
    });
  });
};

const createWebampInstance = async () => {
  const initialTracks = await getInitialTracks();

  new Webamp({
    initialTracks,
    __butterchurnOptions: {
      importButterchurn: () => {
        // Only load butterchurn when music starts playing to reduce initial page load
        return import("butterchurn");
      },
      getPresets: async () => {
        // Load presets from preset URL mapping on demand as they are used
        const resp = await fetch(
          // NOTE: Your preset file must be served from the same domain as your HTML
          // file, or served with permissive CORS HTTP headers:
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
          "https://unpkg.com/butterchurn-presets-weekly@0.0.2/weeks/week1/presets.json"
        );
        const namesToPresetUrls = await resp.json();
        return Object.keys(namesToPresetUrls).map((name) => {
          return { name, butterchurnPresetUrl: namesToPresetUrls[name] };
        });
      },
      butterchurnOpen: true,
    },
    __initialWindowLayout: {
      main: { position: { x: 0, y: 0 } },
      equalizer: { position: { x: 0, y: 116 } },
      playlist: { position: { x: 0, y: 232 }, size: [0, 4] },
      milkdrop: { position: { x: 275, y: 0 }, size: [7, 12] },
    },
  
  }).renderWhenReady(document.getElementById("app"));
};

createWebampInstance();