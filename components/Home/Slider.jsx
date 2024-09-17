import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { config, databases } from '../../lib/appwrite-config';
import Colors from '../../constants/Colors';

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
        setSliderList(response.documents);
    };


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
            <View style={{
                borderWidth:1,
                height:"100%",
                borderRadius:10,
                backgroundColor:Colors.BG
            }}>
                <Image source={{uri:item?.image_url}}
                style={styles?.slider} />
            
            </View>
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
    slider:{
        width:Dimensions.get('screen').width*0.83,
        height:'100%',
        borderRadius:15,
        marginRight:15
    }
})