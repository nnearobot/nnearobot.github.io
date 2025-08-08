export default function manifest() {
  return {
    name: 'nnearobot',
    short_name: 'nnearobot',
    description: 'Experiments',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        "src": "favicon.ico",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "/icon/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/icon/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
  }
}