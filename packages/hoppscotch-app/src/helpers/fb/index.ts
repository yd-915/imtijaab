import { initializeApp } from "firebase/app"
import { initAnalytics } from "./analytics"
import { initAuth } from "./auth"
import { initCollections } from "./collections"
import { initEnvironments } from "./environments"
import { initHistory } from "./history"
import { initSettings } from "./settings"

const firebaseConfig = {
  apiKey: "AIzaSyCE08vDZRnneJBWkTJGlIRK4osfiAHU4FM",
  authDomain: "market-eed24.firebaseapp.com",
  databaseURL: "https://market-eed24-default-rtdb.firebaseio.com",
  projectId: "market-eed24",
  storageBucket: "market-eed24.appspot.com",
  messagingSenderId: "149290205276",
  appId: "1:149290205276:web:9fd1db67dfa01722b4a699",
  measurementId: "G-YT9VD9EE03",
}

let initialized = false

export function initializeFirebase() {
  if (!initialized) {
    try {
      initializeApp(firebaseConfig)

      initAuth()
      initSettings()
      initCollections()
      initHistory()
      initEnvironments()
      initAnalytics()

      initialized = true
    } catch (e) {
      // initializeApp throws exception if we reinitialize
      initialized = true
    }
  }
}
