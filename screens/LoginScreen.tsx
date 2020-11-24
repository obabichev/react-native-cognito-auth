import * as React from 'react';
import {Button, StyleSheet, TextInput, Image} from 'react-native';

import {Text, View} from '../components/Themed';
import {useState} from 'react';

import {Auth} from "aws-amplify";
import {useSession} from '../hooks/useSession';
import {useNavigation} from '@react-navigation/native';
import {logoUri} from './images/logo';

const login = async (username: string, password: string) => {
    return await Auth.signIn(username, password);
};

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const session = useSession();
    const navigation = useNavigation();

    const onLogin = () => {
        login(username, password)
            .then(result => {
                session.setUsername(result.username);
                navigation.navigate('DashboardScreen')
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
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10, width: '70%'}}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}/>
            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10, width: '70%'}}
                placeholder="Password"
                autoCompleteType="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}/>
            <Button title="Login" onPress={onLogin}/>
            {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
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
