import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenNames} from '../navigation/ScreenNamenType';

const ListingScreen = () => {
  const [images, setImages] = useState<[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    let formData = new FormData();
    formData.append('user_id', '108');
    formData.append('offset', offset.toString());
    formData.append('type', 'popular');
    try {
      setIsLoading(true);

      const response = await fetch('http://dev3.xicom.us/xttest/getdata.php', {
        method: 'POST',
        body: formData,
      });
      setIsLoading(false);

      const data = await response.json();
      setImages(data?.images);
      setOffset(prevOffset => prevOffset + 1);
      console.log(offset);

      //   if (Array.isArray(data)) {
      //     setImages(prevImages => [...prevImages, ...data]);
      //     setOffset(prevOffset => prevOffset + 1);
      //   } else {
      //     console.error('Invalid response format:', data);
      //   }
    } catch (error) {
      console.error('Error in fetching images:', error);
      setIsLoading(false);
    }
  };

  const handleImageTap = (item: any) => {
    navigation.navigate(ScreenNames.DetailScreen, {data: item});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={images}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          renderItem={({item, index}: any) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => handleImageTap(item)}
              style={{marginVertical: 10}}>
              <Image source={{uri: item?.xt_image}} style={styles.image} />
            </TouchableOpacity>
          )}
        />
        {offset !== 4 && (
          <TouchableOpacity
            onPress={() => fetchImages()}
            activeOpacity={0.8}
            style={styles.loadButton}>
            <Text>Click here to load more !!!</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};
export default ListingScreen;

const styles = StyleSheet.create({
  loadButton: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#171717',
  },
  image: {width: '100%', aspectRatio: 1, resizeMode: 'contain'},
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
