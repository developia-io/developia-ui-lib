import { useCallback } from 'react';
import { CometChat } from '@cometchat-pro/chat';

let AUTH_PROMISE: any = null;

const appID = '244739fac9b58ec6';
const region = 'eu';
const authKey = 'e95f7b122ea90e1766d3476d598f1d7aa1b6a1c0';

export default function useCometChatAuth() {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .autoEstablishSocketConnection(true)
    .setRegion(region)
    .overrideAdminHost(`${appID}.api-${region}.cc-cluster-2.io/v3`)
    .overrideClientHost(`${appID}.apiclient-${region}.cc-cluster-2.io/v3`)
    .build();

  const connect = useCallback(
    (userId: number) => {
      if (AUTH_PROMISE) {
        return AUTH_PROMISE;
      }

      AUTH_PROMISE = new Promise((resolve, reject) => {
        CometChat.init(appID, appSetting).then(
          () => {
            const login = () =>
              CometChat.login(userId, authKey).then(
                () => {
                  resolve(userId);
                },
                (error) => {
                  reject(error);
                }
              );

            CometChat.getLoggedinUser().then((user) => {
              if (user) {
                if (user?.getUid() !== String(userId)) {
                  CometChat.logout().then(login);
                } else {
                  resolve(userId);
                }
              } else {
                login();
              }
            });
          },
          (error) => {
            reject(error);
          }
        );
      });

      return AUTH_PROMISE;
    },
    [appSetting]
  );

  return {
    connect,
  };
}
