if(!self.define){let e,a={};const i=(i,n)=>(i=new URL(i+".js",n).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const c=e=>i(e,r),d={module:{uri:r},exports:o,require:c};a[r]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d3cd6b1f6f4e769f3aaa75abe90d4359"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/VGy4-v4VT7M22FJJm0SCF/_buildManifest.js",revision:"257cd0c1a37c4719de91cd4654ca9add"},{url:"/_next/static/VGy4-v4VT7M22FJJm0SCF/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/136-eb342cb34113365f.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/163-f166f7ac148fadee.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/259-420750a7fe49281f.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/429.d3912cec6a85082f.js",revision:"d3912cec6a85082f"},{url:"/_next/static/chunks/4bd1b696-91d3cb53201faea1.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/517-3f11dc043c1e6d93.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/551-30c75db63f3d5741.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/568.cf9bcd3705892668.js",revision:"cf9bcd3705892668"},{url:"/_next/static/chunks/824-d0062deca77542c0.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/8ace8c09.c9355a4dc797f9ba.js",revision:"c9355a4dc797f9ba"},{url:"/_next/static/chunks/app/_not-found/page-d882f8d11e6fcd5b.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/adminRegistration/page-24aa6bd03f78ecd7.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/api/auth/admin/%5B%5B...nextadmin%5D%5D/route-b705ccdcf501742a.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/api/webauthn/authenticate/route-536b6f503454b5f3.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/api/webauthn/authentication-options/route-fe46999f1bd3a6c5.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/api/webauthn/register/route-dfeacecec8bc0ede.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/api/webauthn/registration-options/route-40b44b984901b7b5.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/auth/admin/%5B%5B...nextadmin%5D%5D/page-470b2d84a40e20b5.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/auth/admin/profile/page-2cce02fc4ab6df95.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/auth/admin/toMain/page-2d67ba95e669d3a0.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/authorization/page-695136eeb5de3e94.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/layout-7c38c4bf0a10e47f.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/not-found-d2203c4b64b96c2f.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/page-80d351d6cc7bf3f8.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/profile/page-217847bea75e5167.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/app/pwa/page-1007a89c0caed9a2.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/ccd63cfe.6e25ffc198a1edc9.js",revision:"6e25ffc198a1edc9"},{url:"/_next/static/chunks/framework-895c1583be5f925a.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/main-app-0de63d98db6e6ad4.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/main-dc6215037198f410.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/pages/_app-44e5d7e52411c6a5.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/pages/_error-4a2fb0735435b993.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-b9649804e9462ef0.js",revision:"VGy4-v4VT7M22FJJm0SCF"},{url:"/_next/static/css/18b5f9096a324a2d.css",revision:"18b5f9096a324a2d"},{url:"/_next/static/css/4e01ded7e8d0406f.css",revision:"4e01ded7e8d0406f"},{url:"/_next/static/css/cd85cf78b9a182e2.css",revision:"cd85cf78b9a182e2"},{url:"/android/android-launchericon-144-144.png",revision:"22217a8b23bbe1b45a7be9a4da3b1e08"},{url:"/android/android-launchericon-192-192.png",revision:"aa361c28166d8073cd96f0ae5755fad7"},{url:"/android/android-launchericon-48-48.png",revision:"491f050a8a635693270e614948e473f1"},{url:"/android/android-launchericon-512-512.png",revision:"9a43fad551e10a87dfb752ab549bc458"},{url:"/android/android-launchericon-72-72.png",revision:"910ce1341624fb411ddcbe5e11f9478f"},{url:"/android/android-launchericon-96-96.png",revision:"2490f5202ac9d885b27db538497d98d6"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/ios/100.png",revision:"0ea1208489aff5e7a008aada360fd814"},{url:"/ios/1024.png",revision:"c7f5081f187e3135a9c24b5c12fb0e8b"},{url:"/ios/114.png",revision:"7500a216ab941ccaf21892ce601351ea"},{url:"/ios/120.png",revision:"382fa15977dfc484cac1752290bc6e2c"},{url:"/ios/128.png",revision:"e18be52fecd1fd8fea02014914ff1fe6"},{url:"/ios/144.png",revision:"22217a8b23bbe1b45a7be9a4da3b1e08"},{url:"/ios/152.png",revision:"9f3fd68299b87ef21a51666fde46e9f3"},{url:"/ios/16.png",revision:"77d80fdca4d99e71667746851f14b73d"},{url:"/ios/167.png",revision:"54ea1f0ded554b89cc6ebc830329b87f"},{url:"/ios/180.png",revision:"0d8788e9e6b5268f34201b07efad684d"},{url:"/ios/192.png",revision:"aa361c28166d8073cd96f0ae5755fad7"},{url:"/ios/20.png",revision:"3b48cc52e9b7bfca109f882a6560024c"},{url:"/ios/256.png",revision:"60b3f026bffc676bba8b73f837df0f99"},{url:"/ios/29.png",revision:"c5f6d54bd6da7bbcd75fc77849cc14d2"},{url:"/ios/32.png",revision:"04f88af5e646508e40569c9bca7e1fdb"},{url:"/ios/40.png",revision:"676128e5e44e5b7cb9e9581ae8fbd457"},{url:"/ios/50.png",revision:"16f393e4244c31d65f74572a22870582"},{url:"/ios/512.png",revision:"9a43fad551e10a87dfb752ab549bc458"},{url:"/ios/57.png",revision:"ff2eb3f77219ba6488e7215ed1de6909"},{url:"/ios/58.png",revision:"7c59afe0926010aa1f09a0ad20d34c32"},{url:"/ios/60.png",revision:"f9bcad946018aa5f5c21d60d7a295d61"},{url:"/ios/64.png",revision:"fe4a58c1e16df89c374ce9f5b68fce3d"},{url:"/ios/72.png",revision:"910ce1341624fb411ddcbe5e11f9478f"},{url:"/ios/76.png",revision:"5e1d34eca42c2480688e37e446195b95"},{url:"/ios/80.png",revision:"b6f2888d93086bb18d4265d908313a52"},{url:"/ios/87.png",revision:"ffb609a60cae9c996e185af6ec12e02d"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"},{url:"/windows11/LargeTile.scale-100.png",revision:"d82a3a7ed59d1a76692c730c601f336d"},{url:"/windows11/LargeTile.scale-125.png",revision:"d07cc2710a1f7733523e60c9f9c0024b"},{url:"/windows11/LargeTile.scale-150.png",revision:"b2a5d9f6ad313caefa3461f917965d97"},{url:"/windows11/LargeTile.scale-200.png",revision:"3a249019371218c2286d68ba33501152"},{url:"/windows11/LargeTile.scale-400.png",revision:"490b04bf194bb4a202f7553b81b642c6"},{url:"/windows11/SmallTile.scale-100.png",revision:"c3e1c422557f4b512f2d32f5fdcea8b4"},{url:"/windows11/SmallTile.scale-125.png",revision:"bbf7c92c14bc12ae6972c528ed7e9379"},{url:"/windows11/SmallTile.scale-150.png",revision:"93321ad72c7ef3f3089aa62f7f43465f"},{url:"/windows11/SmallTile.scale-200.png",revision:"03692c70c8678ca674f28fafa860dbc7"},{url:"/windows11/SmallTile.scale-400.png",revision:"1f9044a982b4b3ef0a2ace6f15a8d5dd"},{url:"/windows11/SplashScreen.scale-100.png",revision:"2c0f93bb3621f29efbfb9b14391d37a9"},{url:"/windows11/SplashScreen.scale-125.png",revision:"0ee94e8e05ccb09234f1ec03b8cba15e"},{url:"/windows11/SplashScreen.scale-150.png",revision:"9ebafcc59cc44cc69ca12b8b6e31db98"},{url:"/windows11/SplashScreen.scale-200.png",revision:"5aaa95c4eed74609a1e99639afb2a1b9"},{url:"/windows11/SplashScreen.scale-400.png",revision:"299902c03420ab4290d60bd7d69d87d3"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"5221bf970b424d0595982f13443f8705"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"3daf8249f342a71a7bb2e11e9234070f"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"3abd1ff56779c9ddf346b1ebc892c80c"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"0b226b90151c2214852d4036cfec2b36"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"4ff8e72ce1f55f5a0c1efab17604c175"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"ef7924b1932ddde9800ee13b8fcb52be"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"cb78d5a8ed210f47b0a0a62c8643533f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"99510d4aaa7118c71c50918447a01a88"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"7d511534377b2a6da9a68be7e234b3ae"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"837fc18c580a9cf3599c0ccc9fe6190a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"6618d397c9605a8366dea5638bb2a154"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"90c026ff3455400b8df26b3af5c23e68"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"1506f932ca64daacb4d6e6da5f054ad9"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"9c6c9e2e8c86902ed2f85256db78cbe1"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"c9d8a4e2dfeb62f16a3fb1df586c7e9d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"454a3f5122ee5573f3cb0143edccdcd0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"770d6078819e1db5c29b3565e59d67d2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"52d60ca195946c473070ab0e8d8196ff"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"9d9870df8f60ca48c7c872b9df11a579"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"45f76823f3a41559a2690346b034acb6"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"ef7924b1932ddde9800ee13b8fcb52be"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"cb78d5a8ed210f47b0a0a62c8643533f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"99510d4aaa7118c71c50918447a01a88"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"7d511534377b2a6da9a68be7e234b3ae"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"837fc18c580a9cf3599c0ccc9fe6190a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"6618d397c9605a8366dea5638bb2a154"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"90c026ff3455400b8df26b3af5c23e68"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"1506f932ca64daacb4d6e6da5f054ad9"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"9c6c9e2e8c86902ed2f85256db78cbe1"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"c9d8a4e2dfeb62f16a3fb1df586c7e9d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"454a3f5122ee5573f3cb0143edccdcd0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"770d6078819e1db5c29b3565e59d67d2"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"52d60ca195946c473070ab0e8d8196ff"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"9d9870df8f60ca48c7c872b9df11a579"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"45f76823f3a41559a2690346b034acb6"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"9c6c9e2e8c86902ed2f85256db78cbe1"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"5b2952e0db96a16d35d8c4d54e637a50"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"9f5e8745f875fd8894e3261caeec6a06"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"313ac76958cf9f4e55b4e8cb9ead27b6"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"a502a43ca47d689303ab297c5c64b286"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"ef7924b1932ddde9800ee13b8fcb52be"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"cb78d5a8ed210f47b0a0a62c8643533f"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"99510d4aaa7118c71c50918447a01a88"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"7d511534377b2a6da9a68be7e234b3ae"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"837fc18c580a9cf3599c0ccc9fe6190a"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"6618d397c9605a8366dea5638bb2a154"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"90c026ff3455400b8df26b3af5c23e68"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"1506f932ca64daacb4d6e6da5f054ad9"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"9c6c9e2e8c86902ed2f85256db78cbe1"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"c9d8a4e2dfeb62f16a3fb1df586c7e9d"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"454a3f5122ee5573f3cb0143edccdcd0"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"770d6078819e1db5c29b3565e59d67d2"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"52d60ca195946c473070ab0e8d8196ff"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"9d9870df8f60ca48c7c872b9df11a579"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"45f76823f3a41559a2690346b034acb6"},{url:"/windows11/StoreLogo.scale-100.png",revision:"16f393e4244c31d65f74572a22870582"},{url:"/windows11/StoreLogo.scale-125.png",revision:"3a1918ba4dda9f34045837bb20005555"},{url:"/windows11/StoreLogo.scale-150.png",revision:"d403c6e5a725e2a0ae951cf8c081c785"},{url:"/windows11/StoreLogo.scale-200.png",revision:"0ea1208489aff5e7a008aada360fd814"},{url:"/windows11/StoreLogo.scale-400.png",revision:"a6dc9d5c67d6479efd3409a05c8104d0"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"52922c4288732915004b4e112a6b6cde"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"570a439280b7489b23407ffaea426fc5"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"b3b94b6aa36fa3a9245348d2cb18f1ae"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"2c0f93bb3621f29efbfb9b14391d37a9"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"5aaa95c4eed74609a1e99639afb2a1b9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
