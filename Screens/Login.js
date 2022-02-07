import React,{useState} from 'react'
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch , useSelector } from 'react-redux';
import {userLogin} from '../JS/actions/index'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import logo from '../assets/icon.png'
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'
const Login = ({navigation}) => {
    const dispatch= useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.userReducer)
    const {loading, errors, userInfo} = user
    const handleSubmit = (e) => {

      
     console.log('sssssss',errors)
       
          dispatch(userLogin({
            username: email,
            password:password}));
        
      };
    
    return (
        <View style={styles.container}>
            <StatusBar />
           
            
                <Image source={logo} style={{width:86,height:86,zIndex:4}} />

                <Text style={{fontSize:25,fontWeight:'bold'}}>Connexion</Text>
                {errors && <Text style={{color:'red'}}>{errors}</Text>}
                <View style={styles.textContainer}>
                <Text style={{marginBottom:5}}>
                    Email
                </Text>
                <TextInput style={styles.input} placeholder='khouloud97@nomail.com' onChangeText={text=>setEmail(text)} />

                </View>
                <View style={styles.textContainer}>
                <Text style={{marginBottom:5}}>
                    Mot de passe
                </Text>
                <TextInput style={styles.input} placeholder='******' onChangeText={text=>setPassword(text)} />
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('ResetPassword')}>
                <Text style={{alignSelf:'flex-end',color:'#696969',marginTop:10,paddingBottom:10}}>Mot de passe oblié</Text>
                </TouchableOpacity>
               <TouchableOpacity style={{  justifyContent:'center',
    alignItems:'center'}}
    onPress={()=>handleSubmit()}
    >
                   <View style={styles.submit}>
                   <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>
                   Se connecter
                   </Text>
                   </View>
               </TouchableOpacity>
               <View style={{flexDirection:'row',marginTop:20}}>
               <Text style={{color:'#A3A3A3',fontSize:16}}>Vous n'avez pas de compte ? </Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Register')}> 
              <Text style={{color:'#F0651A',fontSize:16}}> S'inscrire</Text>
               </TouchableOpacity>
               </View>
               <TouchableOpacity style={{  justifyContent:'center',
    alignItems:'center'}}>
                   <View style={styles.submitSocial}>
                       <Image source={facebook} style={{width:25,height:25,marginRight:60}} />
                   <Text style={{color:'#000',fontSize:13}}>
                   Inscrivez-vous avec Facebook
                   </Text>
                   </View>
               </TouchableOpacity>
               <TouchableOpacity style={{  justifyContent:'center',
    alignItems:'center'}}>
                   <View style={styles.submitSocial}>
                   <Image source={google} style={{width:25,height:25,marginRight:60}} />
                   <Text style={{color:'#000',fontSize:13}}>
                   Inscrivez-vous avec Google
                   </Text>
                   </View>
               </TouchableOpacity>
        </View>
    )
}

export default Login

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
    borderRadius:20,
    backgroundColor:'#FFFFFF',
    
},
textContainer:{
 marginTop:20,
 width:windowWidth,
 paddingLeft:20,
 paddingRight:20,
 
},
submit:{
    width:windowWidth-20,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F0651A',  
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
    borderRadius:50
     

}
})
