import '@/styles/globals.css'
import Script from 'next/script'
import "../public/assets/css/bootstrap.min.css"
import "../public/assets/css/plugins/jquery.countdown.css"
import "../public/assets/css/plugins/magnific-popup/magnific-popup.css"
import "../public/assets/css/style.css"
import "../public/assets/css/skins/skin-demo-26.css"
import "../public/assets/css/demos/demo-26.css"

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { fetchDataFromApi } from '@/utils/api'

export default function App({ Component, pageProps, siteinfo }) {
  console.log(siteinfo);
  return(
    <>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
  <Script src="assets/js/jquery.min.js"></Script>
    <Script src="assets/js/bootstrap.bundle.min.js"></Script>
    <Script src="assets/js/jquery.hoverIntent.min.js"></Script>
    <Script src="assets/js/jquery.waypoints.min.js"></Script>
    <Script src="assets/js/superfish.min.js"></Script>
    <Script src="assets/js/bootstrap-input-spinner.js"></Script>
    <Script src="assets/js/jquery.plugin.min.js"></Script>
    <Script src="assets/js/jquery.countdown.min.js"></Script>
    <Script src="assets/js/jquery.magnific-popup.min.js"></Script>
  </>
  )
  
}

export async function getStaticProps() {
  const siteinfo = await fetchDataFromApi(
    `/api/siteinfos?populate=*`
  );


  return {
    props: {
      siteinfo,

    },
  };
}
