import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab2.css';

import {
  BiometricSecurityStrength,
  Device,
  SupportedBiometricType,
} from '@ionic-enterprise/identity-vault';

const Tab2: React.FC = () => {
  const [hardware, setHardware] = React.useState<SupportedBiometricType | null>(
    null
  );
  const [privacyShroud, setPrivacyShroud] = React.useState<boolean>(false);
  const [locked, setLocked] = React.useState<boolean>(false);
  const [
    deviceStrength,
    setDeviceStrength,
  ] = React.useState<BiometricSecurityStrength | null>(null);
  const [systemPinSet, setSystemPinSet] = React.useState<boolean>(false);
  const [biometricsSupported, setBiometricsSupported] = React.useState<boolean>(
    false
  );
  const [biometricsEnabled, setBiometricsEnabled] = React.useState<boolean>(
    false
  );

  const checkAvailableHardware = async () => {
    const deviceHardware = await Device.getAvailableHardware();
    setHardware(deviceHardware);
  };

  const isDeviceLockedOut = async () => {
    const isLockedOut = await Device.isLockedOutOfBiometrics();
    setLocked(isLockedOut);
  };

  const checkStrengthLevel = async () => {
    const strength = await Device.getBiometricStrengthLevel();
    setDeviceStrength(strength);
  };

  const checkSystemPasscodeSet = async () => {
    const isPasscodeSet = await Device.isSystemPasscodeSet();
    setSystemPinSet(isPasscodeSet);
  };

  const checkBiometricsSupported = async () => {
    const supported = await Device.isBiometricsSupported();
    setBiometricsSupported(supported);
  };

  const checkBiometricsEnabled = async () => {
    const enabled = await Device.isBiometricsEnabled();
    setBiometricsEnabled(enabled);
  };

  const checkPrivacyShroud = async () => {
    const enabled = await Device.isHideScreenOnBackgroundEnabled();
    setPrivacyShroud(enabled);
  };

  const setTogglePrivacyShroud = async () => {
    await Device.setHideScreenOnBackground(!privacyShroud);
    await checkPrivacyShroud();
  };
  React.useEffect(() => {
    checkAvailableHardware();
    isDeviceLockedOut();
    checkStrengthLevel();
    checkSystemPasscodeSet();
    checkBiometricsSupported();
    checkBiometricsEnabled();
    checkPrivacyShroud();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>
            <strong>Biometrics Supported: </strong>{' '}
            {biometricsSupported ? 'true' : 'false'}
          </p>
          <p>
            <strong>Biometrics Enabled: </strong>{' '}
            {biometricsEnabled ? 'true' : 'false'}
          </p>
          <p>
            <strong>Available Hardware Type:</strong> {hardware}
          </p>
          <p>
            <strong>Device Is Locked:</strong> {locked ? 'true' : 'false'}
          </p>
          <p>
            <strong>Biometric Strength: </strong> {deviceStrength}
          </p>
          <p>
            <strong>System Passcode is Set: </strong>{' '}
            {systemPinSet ? 'true' : 'false'}
          </p>
          <p>
            <strong>App Switcher Privacy Shroud Enabled: </strong>{' '}
            {privacyShroud ? 'true' : 'false'}
          </p>

          <IonButton onClick={setTogglePrivacyShroud}>
            Toggle Privacy Shroud
          </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
