import LottieView from 'lottie-react-native';
import React from 'react';
export default function Logo() {
  return (
    <LottieView
      source={require('~/assets/lottie/logo-renkli.json')}
      style={{ width: '66%', height: '66%' }}
      autoPlay
      loop
    />
  );
}
