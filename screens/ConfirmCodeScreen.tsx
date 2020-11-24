import * as React from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {useState} from 'react';
import {Auth} from "aws-amplify";
import {useSession} from '../hooks/useSession';
import {useNavigation} from '@react-navigation/native';

const confirmSignUp = async (
    username: string,
    password: string,
    code: string
) => {
    await Auth.confirmSignUp(username, code);
    return await Auth.signIn(username, password);
};

export default function ConfirmCodeScreen({route}: { route: any }) {
    const {username, password} = route.params;

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const {setUsername} = useSession();
    const navigation = useNavigation();

    const onConfirm = () => {
        confirmSignUp(username, password, code)
            .then(result => {
                setUsername(result.username);
                navigation.navigate('DashboardScreen')
            })
            .catch(err => {
                setError(err.message);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm code</Text>
            <Text>You should receive the email with verification code.</Text>

            <TextInput
                style={{height: 40, borderColor: "#0000FF", borderWidth: 1, margin: 10, width: '70%'}}
                placeholder="Code"
                value={code}
                onChangeText={setCode}/>
            <Button title="Confirm" onPress={onConfirm}/>
            {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        </View>
    )
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
