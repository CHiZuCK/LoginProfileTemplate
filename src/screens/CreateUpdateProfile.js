import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea.js';
import { nameValidator, emailValidator, passwordValidator } from '../core/utils';

const CreateUpdateProfile = ({ navigation, route }) => {

    const { token } = route.params;
    const { profile } = route.params;
    const { action } = route.params;

    const [homephone, setHomePhone] = useState({ value: profile.homePhone, error: '' });
    const [workphone, setWorkPhone] = useState({ value: profile.workPhone, error: '' });
    const [cellphone, setCellPhone] = useState({ value: profile.cellPhone, error: '' });
    const [address, setAddress] = useState({ value: profile.address, error: '' });
    const [bio, setBio] = useState({ value: profile.bio, error: '' });
    const [hobbies, setHobbies] = useState({ value: profile.hobbies.join(', '), error: '' });
  
    const _createProfile = () => {
        const homePhoneError = nameValidator(homephone.value); //Change to validate phone
        const workPhoneError = nameValidator(workphone.value); //Change to validate phone
        const cellPhoneError = nameValidator(cellphone.value); //Change to validate phone
        const addressError = nameValidator(address.value); //Change to validate address
        const bioError = nameValidator(bio.value); //Change to validate bio

        var hobbiesArray = hobbies.value.split(', ');

        if (homePhoneError || workPhoneError || cellPhoneError || addressError || bioError) {
            setHomePhone({ ...homephone, error: homePhoneError });
            setWorkPhone({ ...workphone, error: workPhoneError });
            setCellPhone({ ...cellphone, error: cellPhoneError });
            setAddress({ ...address, error: addressError });
            setBio({ ...bio, error: bioError });
            return;
        } else {
            var data = {
                cellPhone: cellphone.value,
                homePhone: homephone.value,
                workPhone: workphone.value,
                address: address.value,
                bio: bio.value,
                hobbies: hobbiesArray
            }
            fetch('http://159.89.153.162:5000/api/v1/profile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            });
        }
    }

    return (
        <Background>
            <Logo />
            <Header>{action} Profile</Header>
            <TextInput
                label="Home Phone"
                returnKeyType="next"
                value={homephone.value}
                onChangeText={text => setHomePhone({ value: text, error: '' })}
                error={!!homephone.error}
                errorText={homephone.error}
            />

            <TextInput
                label="Work Phone"
                returnKeyType="next"
                value={workphone.value}
                onChangeText={text => setWorkPhone({ value: text, error: '' })}
                error={!!workphone.error}
                errorText={workphone.error}
            />

            <TextInput
                label="Cell Phone"
                returnKeyType="next"
                value={cellphone.value}
                onChangeText={text => setCellPhone({ value: text, error: '' })}
                error={!!cellphone.error}
                errorText={cellphone.error}
            />

            <TextInput
                label="Address"
                returnKeyType="next"
                value={address.value}
                onChangeText={text => setAddress({ value: text, error: '' })}
                error={!!address.error}
                errorText={address.error}
            />

            <TextArea
                label="Bio"
                returnKeyType="next"
                value={bio.value}
                onChangeText={text => setBio({ value: text, error: '' })}
                error={!!bio.error}
                errorText={bio.error}
            />

            <TextArea
                label="Hobbies"
                returnKeyType="next"
                value={hobbies.value}
                onChangeText={text => setHobbies({ value: text, error: '' })}
                error={!!hobbies.error}
                errorText={hobbies.error}
            />

            <Button mode="outlined" onPress={_createProfile}>
                {action} Profile
            </Button>
        </Background>
    );
  }
  
  export default memo(CreateUpdateProfile);