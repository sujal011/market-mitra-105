import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { config, databases } from '../../lib/appwrite-config';
import Colors from '../../constants/Colors';
import { openURL } from 'expo-linking';

const Slider = () => {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        getSliderList();
    }, []);

    const getSliderList = async () => {
        const response = await databases.listDocuments(
            config.databaseId,
            config.sliderCollectionId
        );
        console.log(response.documents);
        setSliderList(response.documents);
        
    };

    const openLink = (url)=>{
        openURL(url)
    }


  return (
    <View style={{
        height:'15%',
        marginVertical:"2%"
    }}>
      <FlatList 
        horizontal={true}
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>{
                openLink(item.link)
            }}
            style={{
                borderWidth:1,
                height:"100%",
                borderRadius:10,
                marginRight:'1%'
                
            }}>
                <Image source={{uri:item?.image_url}}
                style={styles?.slider} />
            
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    slider:{
        width:Dimensions.get('screen').width*0.80,
        height:'100%',
        borderRadius:15,
        marginRight:15
    }
})