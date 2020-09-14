import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AppMenu from '../components/Menu.js';
import * as ImagePicker from 'expo-image-picker';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';
import global from '../global.js';
import ProfileDisplay from '../components/ProfileDisplay.js';

import { theme } from '../core/theme';

const Dashboard = ({ navigation, route }) => {

  const _formatPhone = number => {
      
    if (number == undefined) {
      return number;
    } else {
      return (
        '(' +
        number.charAt(0) +
        number.charAt(1) +
        number.charAt(2) +
        ') ' +
        number.charAt(3) +
        number.charAt(4) +
        number.charAt(5) +
        '-' +
        number.charAt(6) +
        number.charAt(7) +
        number.charAt(8) +
        number.charAt(9)
      );
    }
  };

  const [photo, setPhoto] = useState(null);
  const [profileHomePhone, setProfileHomePhone] = useState(_formatPhone(global.Profile.homePhone));
  const [profileWorkPhone, setProfileWorkPhone] = useState(_formatPhone(global.Profile.workPhone));
  const [profileCellPhone, setProfileCellPhone] = useState(_formatPhone(global.Profile.cellPhone));
  const [profileAddress, setProfileAddress] = useState(global.Profile.address);
  const [profileBio, setProfileBio] = useState(global.Profile.bio);
  /* const [profileHobbies, setProfileHobbies] = useState(global.Profile.hobbies.join(', ')); */
  const [profileHobbies, setProfileHobbies] = useState('');

  const _handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPhoto(result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const _getPhoto = () => {
    fetch('http://159.89.153.162:5000/api/v1/profile/0001/photo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.Token
      }
    });
  }

  const _uploadPhoto = () => {

    var token = global.Token;

    var image = {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    }

    var data = new FormData();
    data.append('file', image);
    fetch('http://159.89.153.162:5000/api/v1/profile/'+ global.Profile._id +'/photo', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: data
    });
  }

  const _refreshPage = () => {
    setProfileHomePhone(_formatPhone(global.Profile.homePhone));
    setProfileWorkPhone(_formatPhone(global.Profile.workPhone));
    setProfileCellPhone(_formatPhone(global.Profile.cellPhone));
    setProfileAddress(global.Profile.address);
    setProfileBio(global.Profile.bio);
    setProfileHobbies(global.Profile.hobbies.join(', '));
  }

  return (
    <Background>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <AppMenu />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={_refreshPage}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/refresh_icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Header style={{ justifyContent: 'Center' }}>
          {global.User.firstName} {global.User.lastName}
        </Header>
        <ProfileDisplay title="Home Phone">{profileHomePhone}</ProfileDisplay>
        <ProfileDisplay title="Work Phone">{profileWorkPhone}</ProfileDisplay>
        <ProfileDisplay title="Cell Phone">{profileCellPhone}</ProfileDisplay>
        <ProfileDisplay title="Address">{profileAddress}</ProfileDisplay>
        <ProfileDisplay title="Bio">{profileBio}</ProfileDisplay>
        <ProfileDisplay title="Hobbies">{profileHobbies}</ProfileDisplay>
        <Button mode="outlined" onPress={_handleChoosePhoto}>
          Choose Photo
        </Button>
        <Button mode="outlined" onPress={_uploadPhoto}>
          Send Photo
        </Button>
        <Button mode="outlined" onPress={_getPhoto}>
          Get Photo
        </Button>
      </ScrollView>
    </Background>
  );
}

export default memo(Dashboard);
