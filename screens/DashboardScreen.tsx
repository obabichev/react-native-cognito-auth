import * as React from 'react';
import {Button, Image, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {useSession} from '../hooks/useSession';
import {useNavigation} from '@react-navigation/native';
import {logoUri} from './images/logo';

export default function DashboardScreen() {
    const session = useSession();
    const navigation = useNavigation();

    const onLogout = () => {
        session.setUsername(null);
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.container}>
            <Image
                style={{width: 100, height: 100}}
                source={{uri: logoUri}}
            />
            <Text style={styles.title}>Hallo {session.username}</Text>

            <Button title="Logout" onPress={onLogout}/>
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
