import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  Switch,
  Button,
  ScrollView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Text,
} from 'react-native';
import useList from '../hooks/useList';
import EditServices from '../services/edit-service';

const User = () => {
  const [searchApi, results] = useList();
  const [formData, setFormData] = useState({
    corporate_enabled: false,
    appa_club_enabled: false,
    gift_enabled: false,
    parking_enabled: false,
    payment_methods_enabled: false,
    turn_off_register_validations: false,
    additional_benefits_enabled: false,
    transaction_max_amount: 0,
    transaction_max_amount_alert_message: 0,
    invoice_upload_limit: 0,
    elasticsearch_location_radius: 0,
    mercadopago_public_key: '',
    minimum_app_version_suggested: '',
    minimum_app_version_supported: '',
  });

  const propertyLabels = {
    corporate_enabled: 'Corporate Enabled',
    appa_club_enabled: 'Appa Club Enabled',
    gift_enabled: 'Gift Enabled',
    parking_enabled: 'Parking Enabled',
    payment_methods_enabled: 'Payment Methods Enabled',
    turn_off_register_validations: 'Turn Off Register Validations',
    additional_benefits_enabled: 'Additional Benefits Enabled',
    transaction_max_amount: 'Transaction Max Amount',
    transaction_max_amount_alert_message:
      'Transaction Max Amount Alert Message',
    invoice_upload_limit: 'Invoice Upload Limit',
    elasticsearch_location_radius: 'Elasticsearch Location Radius',
    mercadopago_public_key: 'Mercadopago Public Key',
    minimum_app_version_suggested: 'Minimum App Version Suggested',
    minimum_app_version_supported: 'Minimum App Version Supported',
  };

  useEffect(() => {
    searchApi();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Ajusta la posición de tu componente manualmente
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Ajusta la posición de tu componente manualmente
      },
    );

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      const updatedFormData = {};
      results.forEach(({name, value}) => {
        updatedFormData[name] = value;
      });
      setFormData(prevData => ({...prevData, ...updatedFormData}));
    }
  }, [results]);

  const handleSwitchChange = (field: string, value: boolean) => {
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  const onSubmit = async () => {
    try {
      console.log('Data para endPoint', formData);
      await EditServices.updateData(formData);
      Alert.alert('Cambios enviados correctamente');
    } catch (error) {
      Alert.alert('Error al enviar los cambios');
    }
  };
  console.log(formData);
  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.sectionContainer}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View>
              {Object.keys(formData).map((field, index) => {
                if (typeof formData[field] === 'boolean') {
                  return (
                    <View key={`switch-${index}`}>
                      <Switch
                        value={formData[field]}
                        onValueChange={val => handleSwitchChange(field, val)}
                      />
                      <Text>{propertyLabels[field]}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <TextInput
                        key={`input-${index}`}
                        value={formData[field].toString()}
                        onChangeText={val => handleInputChange(field, val)}
                      />
                    </View>
                  );
                }
              })}
              <Button title="Enviar" onPress={onSubmit} />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderColor: '#111',
    margin: 1,
    backgroundColor: 'white',
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default User;
