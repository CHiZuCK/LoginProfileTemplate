import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { Text, ScrollView, View, FlatList, TouchableOpacity } from 'react-native';
import global from '../global.js';
import ContactDisplay from '../components/ContactDisplay.js';

const ContactScreen = ({ navigation, route }) => {

    const _refreshList = () => {
        fetch('http://159.89.153.162:5000/api/v1/profile/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + global.Token,
          },
        })
          .then(response => response.json())
          .then(json => {
            console.log(json.contacts);
            setData(json.contacts);
          });
    };

    const _navigateCreateContact = async () => {
        navigation.navigate('CreateContactScreen');
    };

    const [data, setData] = useState(global.Profile.contacts);

    console.log(data);

    return (
      <Background>
        <ScrollView
          style={{
            width: '100%',
            maxWidth: 500,
          }}
        >
          {
            data ? <ContactDisplay data={data} /> : <View style={{ marginBottom: 10 }}><Text>There are no contacts associated with this profile.</Text></View>
          }
          <Button mode="outlined" onPress={_navigateCreateContact}>
            New Contact
          </Button>
          <Button mode="outlined" onPress={_refreshList}>
            Refresh Contacts
          </Button>
        </ScrollView>
      </Background>
    );
};

export default memo(ContactScreen);
