import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab1.css';
import { Vault } from '@ionic-enterprise/identity-vault';
import React, { useMemo, useState } from 'react';
import { IdentityVaultConfig } from '@ionic-enterprise/identity-vault/dist/esm/IdenityVaultConfig';

const Tab1: React.FC = () => {
  const [key, setKey] = useState('aaa');
  const [value, setValue] = useState('test');
  const [vaultValue, setVaultValue] = useState<string | null>('');
  const [error, setError] = useState<any>();

  const [vaultConfig, setVaultConfig] = useState<IdentityVaultConfig>({
    key: 'com.ionic.vaultapp',
    type: 'CustomPasscode',
    deviceSecurityType: 'Both',
    lockAfterBackgrounded: 2000,
    shouldClearVaultAfterTooManyFailedAttempts: true,
    customPasscodeInvalidUnlockAttempts: 2,
    unlockVaultOnLoad: true,
  });

  const vault = useMemo(() => {
    const vault = new Vault(vaultConfig);

    vault.onConfigChanged((config) => {
      console.log('config changed', config);
    });

    vault.onError((err) => {
      console.log('ERROR from callback', err);
    });

    vault.onUnlock(() => {
      console.log('UNLOCKED!#@!');
    });
    vault.onLock(() => {
      console.log('LOCKED!#@!');
    });

    vault.onPasscodeRequested(async () => {
      const doesVaultExist = await vault.doesVaultExist();
      const message = doesVaultExist ? 'Enter passcode:' : 'Setup Passcode';
      const passcode = window.prompt(message) || '';
      vault.setCustomPasscode(passcode);
      return Promise.resolve();
    });
    return vault;
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Key</IonLabel>
            <IonInput
              value={key}
              onIonChange={(e) => {
                setKey(e.detail.value!);
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Value</IonLabel>
            <IonInput
              value={value}
              onIonChange={(e) => {
                setValue(e.detail.value!);
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton
          onClick={async (e) => {
            try {
              setError(undefined);
              await vault.setValue(key, value);
            } catch (e) {
              setError(e);
            }
          }}
        >
          Set Value
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const result = await vault.getValue(key);
              setVaultValue(result);
            } catch (e) {
              setError(e);
            }
          }}
        >
          Get Value
        </IonButton>
        <IonButton
          onClick={async (e) => {
            try {
              setError(undefined);
              await vault.removeValue(key);
            } catch (e) {
              setError(e);
            }
          }}
        >
          Remove Value
        </IonButton>
        <IonList>
          <IonItem>
            <IonLabel>Value</IonLabel>
            <p>{JSON.stringify(vaultValue)}</p>
          </IonItem>
        </IonList>

        <br />
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const result = await vault.getKeys();
              setVaultValue(JSON.stringify(result));
            } catch (e) {
              setError(e);
            }
          }}
        >
          Get Keys
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              await vault.setValue(key, {
                name: 'Ely',
                attributes: {
                  age: 42,
                  status: 'alive',
                },
              });
            } catch (e) {
              setError(e);
            }
          }}
        >
          Save Object
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              await vault.clear();
            } catch (e) {
              setError(e);
            }
          }}
        >
          Clear vault
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              await vault.lock();
            } catch (e) {
              setError(e);
            }
          }}
        >
          Lock vault
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              await vault.unlock();
            } catch (e) {
              setError(e);
            }
          }}
        >
          Unlock vault
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const result = await vault.isLocked();
              alert('isLocked: ' + result);
            } catch (e) {
              setError(e);
            }
          }}
        >
          isLocked?
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const result = await vault.doesVaultExist();
              alert('doesVaultExist: ' + result);
            } catch (e) {
              setError(e);
            }
          }}
        >
          doesVaultExist?
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const vaultData = await vault.exportVault();
              const json = JSON.stringify(vaultData);
              alert(json);
              // setVaultValue(JSON.stringify(json));
            } catch (e) {
              setError(e);
            }
          }}
        >
          exportVault
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const object = {
                randomNumber: Math.floor(Math.random() * 100).toString(),
              };
              vault.importVault(object);
            } catch (e) {
              setError(e);
            }
          }}
        >
          importVault
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const newConfig = {
                ...vaultConfig,
                type: 'CustomPasscode' as any,
              };
              setVaultConfig(newConfig);
              vault.updateConfig(newConfig);
            } catch (e) {
              setError(e);
            }
          }}
        >
          Set type to CustomPasscode
        </IonButton>
        <IonButton
          onClick={async () => {
            try {
              setError(undefined);
              const newConfig = {
                ...vaultConfig,
                type: 'DeviceSecurity' as any,
              };
              setVaultConfig(newConfig);
              vault.updateConfig(newConfig);
            } catch (e) {
              setError(e);
            }
          }}
        >
          Set type to DeviceSecurity
        </IonButton>

        {error && JSON.stringify(error)}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
