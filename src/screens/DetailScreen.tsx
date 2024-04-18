import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const DetailScreen = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {data} = useRoute<any>()?.params;
  const navigation = useNavigation<any>();
  const handleSubmit = async () => {
    var regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!firstName || !lastName || !email || !phone) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    } else if (!regex.test(email)) {
      Alert.alert('Email not valid');
    } else if (phone.length < 10) {
      Alert.alert('Phone no not valid');
    } else {
      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('user_image', {
        uri: data?.xt_image,
        name: 'user_image.jpg',
        type: 'image/jpeg',
      });
      try {
        setIsLoading(true);
        await fetch(`http://dev3.xicom.us/xttest/savedata.php`, {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(
            data => (
              setIsLoading(false),
              Alert.alert(data?.message, undefined, [
                {text: 'OK', onPress: () => navigation.goBack()},
              ])
            ),
          );
      } catch (error) {
        console.log(error);
        setIsLoading(false),
          Alert.alert('Error', 'Failed to save user data. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back.png')}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text style={[styles.text, {fontSize: 16, fontWeight: '500'}]}>
            Detail Screen
          </Text>
        </View>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: data?.xt_image}}
            style={{width: '100%', aspectRatio: 1}}
            resizeMode="contain"
          />
          <View style={styles.textInputDirection}>
            <Text style={styles.text}>First Name</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.text}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
          </View>
          <View style={styles.textInputDirection}>
            <Text style={styles.text}>Last Name</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.text}
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </View>
          </View>
          <View style={styles.textInputDirection}>
            <Text style={styles.text}>Email</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.text}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.textInputDirection}>
            <Text style={styles.text}>Phone</Text>
            <View style={styles.container}>
              <TextInput
                style={styles.text}
                value={phone}
                keyboardType="number-pad"
                onChangeText={text => setPhone(text)}
                maxLength={10}
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSubmit()}
            style={styles.submit}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#000'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  textInputDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {color: '#000', fontSize: 12, fontWeight: 'bold'},
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    width: '70%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  submit: {
    marginBottom: 10,
    width: '40%',

    borderWidth: 1,
    height: 50,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    height: 50,
  },
});
