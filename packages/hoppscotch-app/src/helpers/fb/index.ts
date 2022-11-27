import { initializeApp } from "firebase/app"
import { initAnalytics } from "./analytics"
import { initAuth } from "./auth"
import { initCollections } from "./collections"
import { initEnvironments } from "./environments"
import { initHistory } from "./history"
import { initSettings } from "./settings"

const firebaseConfig = {
 apiKey: "AIzaSyArzlaZEjOGY4uo7togIEkPG1tJUkx8KdA",
  authDomain: "imtijaab.firebaseapp.com",
  projectId: "imtijaab",
  storageBucket: "imtijaab.appspot.com",
  messagingSenderId: "1039388818913",
  appId: "1:1039388818913:web:cdccffe86fdce64a3326a0",
  measurementId: "G-CEH7MSSVW4"
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
