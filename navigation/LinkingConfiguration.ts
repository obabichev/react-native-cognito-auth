import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'Login',
            },
          },
          Register: {
            screens: {
              RegisterScreen: 'Register',
            },
          },
          Dashboard: {
            screens: {
              DashboardScreen: 'Dashboard',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
