/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppInner from './AppInner';

const App = () => {
  return (
    <SafeAreaView>
      <AppInner />
    </SafeAreaView>
  );
};

export default App;
