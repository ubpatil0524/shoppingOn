import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import RootNavigator from './src/navigators/Rootnavigator';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App() {
  const theme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#f5f5f5',
        border: '#D9D9D9',
        primary: '#191919',
      },
    }),
    [],
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
