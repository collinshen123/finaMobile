import React, { useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const WEB_APP_URL = 'https://www.fina.money/';

function App() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Configure Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '246133755149-akn6tqdaugdqm30maute6bipmtkmd9ll.apps.googleusercontent.com',
      iosClientId:
        '246133755149-5rn6pctharrvip4m5olf3igrriujlq5t.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('User info:', result);

      // Send token to WebView if needed
      webViewRef.current?.injectJavaScript(`
        window.postMessage(${JSON.stringify(result)}, '*');
      `);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled sign in');
      } else {
        console.error(error);
      }
    }
  };

  const handleReload = () => {
    setError(null);
    setLoading(true);
    webViewRef.current?.reload();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.container}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Connection Error</Text>
              <Text style={styles.errorMessage}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleReload}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <WebView
                ref={webViewRef}
                source={{ uri: WEB_APP_URL }}
                style={styles.webview}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                javaScriptEnabled
                domStorageEnabled
                allowFileAccess
                mixedContentMode="compatibility"
                thirdPartyCookiesEnabled
                onError={({ nativeEvent }) => {
                  setError(`Failed to load: ${nativeEvent.description || 'Unknown error'}`);
                }}
                onHttpError={({ nativeEvent }) => {
                  if (nativeEvent.statusCode >= 400) {
                    setError(`HTTP Error: ${nativeEvent.statusCode}`);
                  }
                }}
                onShouldStartLoadWithRequest={(request) => {
                  console.log('Loading URL:', request.url);
                  if (
                    request.url.includes('accounts.google.com') ||
                    request.url.includes('auth.google')
                  ) {
                    handleGoogleSignIn();
                    return false;
                  }
                  return true;
                }}
              />

              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0066cc" />
                  <Text style={styles.loadingText}>Loading Fina Money...</Text>
                </View>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
