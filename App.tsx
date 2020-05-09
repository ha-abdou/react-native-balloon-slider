import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BalloonSlider from './src/balloonSlider/index';

export default function App() {
  return (
    <View style={styles.container}>
      <BalloonSlider
        startValue={75}
        valueRange={[50, 100]}
        mainColor="red"
        secondaryColor="green"
        backgroundColor="black"
        onChange={(v) => {
          //console.log("onChange", v)
        }}
        onSelect={(v) => {
          //console.log("onSelect", v)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
