import { initializeApp } from "firebase/app"
import { initAnalytics } from "./analytics"
import { initAuth } from "./auth"
import { initCollections } from "./collections"
import { initEnvironments } from "./environments"
import { initHistory } from "./history"
import { initSettings } from "./settings"

const firebaseConfig = {
 apiKey: "AIzaSyApN5iYz4JhRyJHzEmTXleSE5yghZOvM3k",
  authDomain: "saxichat.firebaseapp.com",
  projectId: "saxichat",
  storageBucket: "saxichat.appspot.com",
  messagingSenderId: "336911539806",
  appId: "1:336911539806:web:89eab0783d20c79587decf",
  measurementId: "G-39G4LV1L7H"
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
