import React from 'react'
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import logo from '../assets/icon.png'

const Validate = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
                <Image source={logo} style={{width:86,height:86,zIndex:4}} />
                <Text style={{fontSize:25,fontWeight:'bold',marginBottom:40}}>Verification d'Email</Text>
                <View style={styles.textContainer}>
                <Text style={{marginBottom:5,fontSize:16}}>
                    Vous avez recu un Email de confirmation sur votre boite mail
                </Text>
                </View>
               <TouchableOpacity style={{  justifyContent:'center',
                   alignItems:'center',position:'absolute',bottom:10}}>
                   <View style={styles.submit}>
                   <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>
                    Ouvrir la boite Email
                   </Text>
                   </View>
               </TouchableOpacity>
              
             
        </View>
    )
}

export default Validate

const styles = StyleSheet.create({
container:{
    justifyContent:'center',
    alignItems:'center',
    height:windowHeight,
    width:windowWidth,
    padding:20,
    backgroundColor:'#fff1dc'
   
},
input:{
    width:windowWidth-40,
    height:60,
    paddingLeft:10,
    borderRadius:15,
    backgroundColor:'#FFFFFF'
},
textContainer:{
 marginTop:20,
 width:windowWidth,
 paddingLeft:20,
 paddingRight:20
},
submit:{
    width:windowWidth-20,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00B894',  
    borderRadius:50,

},
submitSocial:{
    width:windowWidth-20,
    height:60,
    marginTop:20,
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#FFFFFF', 
    paddingLeft:30,
     

}
})
