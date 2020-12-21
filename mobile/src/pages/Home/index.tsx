import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import markerImg from '../../assets/marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Home = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages')
      .then(response => {
        setOrphanages(response.data);
      })  
  });

  const handleNavigateOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id });
  }

  const handleNavigateCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: -7.0332552,
          longitude: -37.2868354,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,      
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id} 
            coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}
            title={'Dev'}
            description={'Aqui é o ponto do dev'}
            image={markerImg}
          >
            <Callout onPress={() => handleNavigateOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
                <Icon name='arrow-right' size={20} color='#0089a5' />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton onPress={handleNavigateCreateOrphanage}style={styles.actionButton}>
          <Icon name='plus' size={20} color='#fff' />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    maxWidth: 160,
    height: 36,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'Nunito_700Bold',
  },
  actionContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 56,
    paddingLeft: 24,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    elevation: 3,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
  },
  actionText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },
  actionButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Home;
