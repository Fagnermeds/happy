import React from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderCloseButton = () => {
  const navigation = useNavigation();

  const handleGoBackToHomePage = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={{ marginRight: 8 }}>
    <BorderlessButton onPress={handleGoBackToHomePage}>
      <Icon name='x' size={24} color='#ff669d' />
    </BorderlessButton>
  </View>
  );
}

export default HeaderCloseButton;