import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {AuthNavigation} from './navigation';

import {Amplify} from "aws-amplify";
import {SessionProvider} from './hooks/useSession';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        console.log('[obabichev] configure aplify');
        Amplify.configure({
            Auth: {
                mandatorySignIn: true,
                region: 'eu-central-1',
                userPoolId: 'eu-central-1_qrgEgEmpr',
                userPoolWebClientId: '48a6qbi8qt04vtkr0ecarcgcnl',
            }
        })
    }, [])

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SessionProvider value={{username, setUsername}}>
                <SafeAreaProvider>
                    <AuthNavigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </SessionProvider>
        );
    }
}
