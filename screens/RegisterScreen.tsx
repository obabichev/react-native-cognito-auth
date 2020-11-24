import * as React from 'react';
import {Button, Image, StyleSheet, TextInput} from 'react-native';

import {Text, View} from '../components/Themed';
import {useState} from 'react';

import {Auth} from "aws-amplify";
import {useNavigation} from '@react-navigation/native';
import {logoUri} from './images/logo';


const register = async (email: string, username: string, password: string) => {
    return await Auth.signUp({username, password, attributes: {email}});
};

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigation = useNavigation();

    const onRegister = () => {
        register(email, username, password)
            .then(() => {
                navigation.navigate('ConfirmCodeScreen', {username, password})
            })
            .catch(err => {
                setError(err.message);
            })
    }

    return (
        <View style={styles.container}>
            <Image
                style={{width: 100, height: 100}}
                source={{uri: logoUri}}
            />
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10}}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}/>
            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10}}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}/>
            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10}}
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}/>
            <Button title="Register" onPress={onRegister}/>
            {error && <Text style={{color: 'red'}}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
