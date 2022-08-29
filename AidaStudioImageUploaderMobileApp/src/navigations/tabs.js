import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ImportImageOptions from '../screens/ImportImageOptions.js';
import QRScanner from '../screens/QRScanner/index';
import About from '../screens/About/index';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardStyleInterpolators} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
const MyTabs = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
        },
      }}>
      <Tab.Screen
        name="QRScanner"
        component={QRScanner}
        initialParams={{
          navigation: navigation,
          ImportImageOptions: ImportImageOptions,
        }}
        options={{
          headerTitle: (
            props, // App Logo
          ) => (
            <View
              resizeMode="contain"
              style={[
                styles.container,
                {
                  flexDirection: 'row',
                  alignContent: 'space-between',
                },
              ]}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/icons/NovelisLogo.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#303167',
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Aida Studio Image Uploader
              </Text>
            </View>
          ),
          headerTitleStyle: {flex: 1, textAlign: 'center'},

          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="qrcode-scan"
                size={30}
                color={focused ? '#FF067E' : '#AEAEAE'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          headerTitle: (
            props, // App Logo
          ) => (
            <View
              resizeMode="contain"
              style={[
                styles.container,
                {
                  flexDirection: 'row',
                  alignContent: 'space-between',
                },
              ]}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/icons/NovelisLogo.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#303167',
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Aida Studio Image Uploader
              </Text>
            </View>
          ),

          headerTitleStyle: {flex: 1, textAlign: 'center'},
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="alpha-i-circle"
                size={30}
                color={focused ? '#FF067E' : '#AEAEAE'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const appNavigations = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={MyTabs}
      />
      <Stack.Screen
        name="ImportImageOptions"
        component={ImportImageOptions}
        options={{
          headerShown: false,
          modalPresentationStyle: 'fullScreen',
          headerTitle: (
            props, // App Logo
          ) => (
            <View
              resizeMode="contain"
              style={[
                styles.container,
                {
                  flexDirection: 'row',
                  alignContent: 'space-between',
                },
              ]}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/icons/NovelisLogo.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#303167',
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Aida Studio Image Uploader
              </Text>
            </View>
          ),
          headerTitleStyle: {flex: 1, textAlign: 'center'},
          tabBarButton: props => null,
          tabBarVisible: false,
        }}
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          position: 'absolute',
          flex: 1,
        }}
        screenOptions={{}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanner}
        initialParams={{
          navigation: navigation,
          ImportImageOptions: ImportImageOptions,
        }}
        options={{
          headerTitle: (
            props, // App Logo
          ) => (
            <View
              resizeMode="contain"
              style={[
                styles.container,
                {
                  flexDirection: 'row',
                  alignContent: 'space-between',
                },
              ]}>
              <Image
                style={{width: 40, height: 40}}
                source={require('../../assets/icons/NovelisLogo.png')}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#303167',
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Aida Studio Image Uploader
              </Text>
            </View>
          ),
          headerTitleStyle: {flex: 1, textAlign: 'center'},
        }}
      />
    </Stack.Navigator>
  );
};

export default appNavigations;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
