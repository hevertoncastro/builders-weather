import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkProvider} from 'react-native-offline';
import {ApolloProvider} from '@apollo/client';
import getApolloClient from '@services/apollo';
import QueueLink from 'apollo-link-queue';
import SplashScreen from 'react-native-splash-screen';
import BackgroundFetch from 'react-native-background-fetch';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@redux/store';
import RootNavigator from './stacks/RootNavigator';
import {setDebugItem} from '@services/debugger';
import authentication from '@services/authentication';

import {defineInterceptor} from '@services/axios';
const queueLink = new QueueLink();

const App = () => {
  const [client, setClient] = useState<any>(null);
  const [validToken, setValidToken] = useState<string | null>(null);
  const [hasFetchToken, setHasFetchToken] = useState(false);

  const initializeApolloClient = async () => {
    await getApolloClient(queueLink).then(apolloClient => {
      setClient(apolloClient);
    });
  };

  useEffect(() => {
    initializeApolloClient();
    SplashScreen.hide();
  }, []);

  defineInterceptor();

  const handleTokenRefresh = useCallback(async () => {
    // @TODO: Clean massive debug messages
    setDebugItem({
      title: 'handleTokenRefresh',
      value: 'method called',
    });
    const token = await AsyncStorage.getItem('@KEYCLOAK_REFRESH_TOKEN');
    setDebugItem({
      title: 'handleTokenRefresh',
      value: `token: ${token || ''}`,
    });
    if (token) {
      setDebugItem({
        title: 'handleTokenRefresh',
        value: 'token exists (inside if)',
      });
      authentication
        .refreshToken({refresh_token: token})
        .then(response => {
          const delayCalculation = (response.refresh_expires_in - 60) * 1000;
          setValidToken(response.refresh_token);

          setDebugItem({
            title: 'token refresh response',
            value: `${JSON.stringify(response)}`,
          });

          callDelayedTokenRefresh(delayCalculation);
          setHasFetchToken(true);

          setDebugItem({
            title: 'Token refreshed',
            value: `call next token refresh in delayCalculation: ${
              delayCalculation || ''
            }`,
          });
        })
        .catch(() => {
          setDebugItem({
            title: 'clearAuthenticationData',
            value: 'called in catch of token refresh',
          });
          clearAuthenticationData();
        });
    } else {
      setDebugItem({
        title: 'clearAuthenticationData',
        value: 'called in else of if(token)',
      });
      clearAuthenticationData();
    }
  }, []);

  const initBackgroundFetch = useCallback(async () => {
    const onEvent = async (taskId: any) => {
      switch (taskId) {
        case 'br.com.dasa.am.coletador.refresh_token':
          setDebugItem({
            title: 'initBackgroundFetch',
            value: 'br.com.dasa.am.coletador.refresh_token',
          });
          await handleTokenRefresh();
          break;
        default:
          setDebugItem({
            title: 'initBackgroundFetch',
            value: 'default taskId',
          });
          await handleTokenRefresh();
          break;
      }

      BackgroundFetch.finish(taskId);
    };

    const onTimeout = async (taskId: any) => {
      BackgroundFetch.finish(taskId);
    };

    await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );
  }, [handleTokenRefresh]);

  useEffect(() => {
    initBackgroundFetch();
    // handleTokenRefresh();
  }, [initBackgroundFetch, handleTokenRefresh]);

  useEffect(() => {
    // Set previous token in state
    async function getCurrentUserToken() {
      const currentUserToken = await AsyncStorage.getItem('@KEYCLOAK_TOKEN');
      setValidToken(currentUserToken);
    }

    getCurrentUserToken();
  }, []);

  function callDelayedTokenRefresh(delay: number) {
    BackgroundFetch.scheduleTask({
      taskId: 'br.com.dasa.am.coletador.refresh_token',
      forceAlarmManager: false,
      delay: delay,
    });
  }

  async function clearAuthenticationData() {
    setHasFetchToken(true);
  }

  if (!client) {
    // @TODO: render loading
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NetworkProvider>
            <RootNavigator
              hasFetchToken={hasFetchToken}
              validToken={validToken}
            />
          </NetworkProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
