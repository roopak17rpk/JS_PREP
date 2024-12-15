/**
 *
 * pwa = progressive web app.
 *
 * cost of development is high. a pwa can run on bot browser
 * and as app so cost of development is low for pwa.
 *
 * pwa being hosted as website also increases the discoverability vs app
 *
 * with apps there is long process of searching and downloading before giving the forst experience.
 *
 * apps dont have seo .
 *
 * apps are easy to rember websites are not(homescreen advantage)
 *
 * websites didnt have offline support and push notification.
 *
 * pwa are just websites that behave like an app.
 *
 * advantage of pwa => 1. easy to discover
 *                     2. seo with pwa apps
 *                     3. offline support
 *                     4. push notification
 *                     5. home screen support
 *                     6. background sync(whatsapp msg works on offline mode)
 *                     7. They are mobile first experience.
 *                     8. access to device api.
 *                     9. no upfront installation.
 */

/**
 * to create a pwa we need to create a manifest.json file.
 *
 *
 */

const manifestJsonObject = {
  name: "pwa",
  short_name: "pwa",
  description: "pwa",
  icons: [
    {
      src: "icon.png",
      purpose: "any",
      sizes: "192x192",
      type: "image/png",
    },
  ],
  theme_color: "#000000",
  background_color: "#000000",
  display: "standalone",
  scope: "/",
  start_url: "/",
  orientation: "portrait",
};

/**
 * to check pwa statiticswe can use lighthouse.
 */

// in index.html we need to add the manifest.json file.

<link rel="manifest" href="manifest.json" />
// this will enable the install prompt on mobile devices and desktop devices.