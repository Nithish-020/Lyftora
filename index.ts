import 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { registerRootComponent } from 'expo';

// Lets Expo Web close the auth session when the redirect URL loads (e.g. Google OAuth).
WebBrowser.maybeCompleteAuthSession();

import App from './App';

registerRootComponent(App);
