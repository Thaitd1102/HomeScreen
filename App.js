import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneInput from './PhoneInput';
import ContinueButton from './ContinueButton';
import HomeScreen from './HomeScreen'; // Import the HomeScreen from the separate file

// SignInScreen component
function SignInScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const handleContinue = () => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    if (!isValidPhoneNumber(formattedNumber)) {
      Alert.alert('Số điện thoại không hợp lệ!', 'Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }
    // Navigate to HomeScreen when the phone number is valid
    navigation.navigate('Home');
  };

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10,14}$/;
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (number) => {
    return number.replace(/\D/g, '');
  };

  const handlePhoneInputChange = (text) => {
    const formattedText = formatPhoneNumber(text);
    setPhoneNumber(formattedText);
    setIsPhoneValid(isValidPhoneNumber(formattedText));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Nhập số điện thoại</Text>
      <Text style={styles.description}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>
      <PhoneInput 
        phoneNumber={phoneNumber} 
        setPhoneNumber={handlePhoneInputChange} 
        isValid={isPhoneValid}
      />
      <ContinueButton onPress={handleContinue} />
    </View>
  );
}

// Navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Đăng nhập' }} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
});
