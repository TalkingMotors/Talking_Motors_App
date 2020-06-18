import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
import * as VehicleService from '../services/Vehicle';
let screenwidth = Dimensions.get('window').width;
const numOfColumns = 3;
export default class EditVehicleImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            ModalOpen: false,
            vehicleId: 0,
            isLoader:false,
            PremiumDate:0,
            selectedPosition:0,
            ModalTitle:'',
            selectedpositionUrl:'',
            allImages: [{ position: 1, name: "IMAGE 1", thumbUrl: '', url: '' },
            { position: 2, name: "IMAGE 2", thumbUrl: '', url: '' }, { position: 3, name: "IMAGE 3", thumbUrl: '', url: '' },
            { position: 4, name: "IMAGE 4", thumbUrl: '', url: '' }, { position: 5, name: "IMAGE 5", thumbUrl: '', url: '' },
            { position: 6, name: "IMAGE 6", thumbUrl: '', url: '' },
            { position: 7, name: "IMAGE 7", thumbUrl: '', url: '' }, { position: 8, name: "IMAGE 8", thumbUrl: '', url: '' },
            { position: 9, name: "IMAGE 9", thumbUrl: '', url: '' },]

        }
    }
    componentWillMount() {
        var params = this.props.navigation.state.params.item
        let vehicleData = this.props.navigation.state.params.data
        let getAllImages = this.props.navigation.state.params.allImages
        let PremiumDate = this.props.navigation.state.params.PremiumDate
        this.setState({
            vehicleId: vehicleData.id,
        })
        if(PremiumDate > 0){
            this.setState({
                PremiumDate:PremiumDate
            })
        for (var i = 0; i < this.state.allImages.length; i++) {
            for(var j=0 ; j<getAllImages.length ; j ++){
                if(this.state.allImages[i].position ==getAllImages[j].position){
                    this.state.allImages[i]=getAllImages[j]
                }
            }
            }
        }
        else{
            this.setState({
                allImages:[],
            })
        }
        // let params = undefined
        if (!Utilities.stringIsEmpty(params)) {
            if(params.position !=0){
                params = ''
            }
            this.setState({
                image: params,
                vehicleId: vehicleData.id,
                PremiumDate:PremiumDate
            })
        }
    }

    ToggleModal() {
        this.setState({
            ModalOpen: !this.state.ModalOpen
        })
    }
    openCamera = () => {
        try {
            ImagePicker.clean();
            ImagePicker.openCamera({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
                useFrontCamera: true
            }).then(imageDetail => {
                if (Object.keys(imageDetail).length > 0) {
                    var base64Image = `${imageDetail.data}`
                    this.InsertVehicleImage(base64Image)
                }

            });
        }
        catch (e) {
            console.log("openCamera Exception EditVehicleImage", e)
        }
    }
    openGallery = () => {
        try {
            ImagePicker.clean();
            this.setState({
                ModalOpen: !this.state.ModalOpen
            }, () => {
                ImagePicker.openPicker({
                    width: 200,
                    height: 200,
                    cropping: true,
                    includeBase64: true,
                }).then(imageDetail => {
                    if (Object.keys(imageDetail).length > 0) {
                        var base64Image = `${imageDetail.data}`
                        this.InsertVehicleImage(base64Image)
                    }

                });
            }
            )
        } catch (e) {
            console.log("openGallery EditVehicleImage", e)
        }
    }

    deletePhoto = async () => {
        try {
            if (this.state.selectedPosition == 0) {
                var getId = this.state.image.id

            }
            else {
                var index = this.state.allImages.findIndex(x => x.position == this.state.selectedPosition);
                var getId = this.state.allImages.filter(i => i.position == this.state.selectedPosition)[0].id;
            }
            let params = {
                id: getId
            }
            var response = await VehicleService.RemoveVehicleImage(params)
            if (response.success) {
                if (this.state.selectedPosition == 0) {
                    this.ToggleModal();
                    this.setState({
                        image: ''
                    })
                }
                else {
                    let obj = {
                        position: this.state.selectedPosition,
                        name: "IMAGE " + this.state.selectedPosition,
                        thumbUrl: "",
                        url: ""
                    }
                    this.state.allImages.splice(index, 1, obj);
                    this.ToggleModal();
                    this.setState({
                        allImages: this.state.allImages,
                    })
                }
            }

        }
        catch (e) {
            console.log("deletePhoto EditVehicleImage", e)
        }
    }

    InsertVehicleImage = async (image) => {
        try{
        var params = {
            vehicleId: this.state.vehicleId,
            image: image,
            position: this.state.selectedPosition
        }
        this.setState({
            isLoader:true
        })
         var response = await VehicleService.InsertVehicleImage(params)
        if (response.success) {
            if (this.state.selectedPosition == 0) {
                this.setState({
                    image: response.vehicleImage,
                    isLoader: false
                })
            }
            else {
                let index = this.state.allImages.findIndex(x => x.position == response.vehicleImage.position);
                this.state.allImages.splice(index, 1, response.vehicleImage)
                this.setState({
                    allImages: this.state.allImages
                })
            }
        }
        }
        catch(e){
            this.setState({
                isLoader:false
            })
            console.log("InsertVehicleImage EditVehicleImage", e)
        }

    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Edit Vehicle Image" navigation={this.props} />

                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={{ width: '100%', height: 270, justifyContent: 'center', alignItems: 'center', borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}>
                        {!Utilities.stringIsEmpty(this.state.image) ?
                            <Transition >
                                <TouchableOpacity
                                style={{width: '100%', height: 270,alignItems: 'center',}}
                                onPress={()=>{
                                    this.setState({
                                        ModalTitle:"Edit Main Picture",
                                        selectedPosition:0,
                                        selectedpositionUrl:this.state.image.url
                                        
                                    },()=>{
                                       this.ToggleModal()
                                    })
                                }}
                                >
                                     <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20,position:'absolute',zIndex:2,top:"40%",textAlignVertical:'center'}}>+</Text>
                                     <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20,position:'absolute',zIndex:2,top:"50%",textAlignVertical:'center'}}>Edit Main Picture</Text>
                                <Image
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: this.state.image.url }}
                                />
                                </TouchableOpacity>
                            </Transition>
                            :
                            <TouchableOpacity onPress={()=>{
                                this.setState({
                                    ModalTitle:"Edit Main Picture",
                                    selectedPosition:0,
                                    selectedpositionUrl:''
                                    
                                },()=>{
                                   this.ToggleModal()
                                })
                            }} style={{ paddingTop:20, alignItems: 'center', width: '100%', height: '100%',  backgroundColor:'#C0C0C0', }}>
                              <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20,position:'absolute',zIndex:2,top:"65%",textAlignVertical:'center'}}>+</Text>
                                     <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20,position:'absolute',zIndex:2,top:"75%",textAlignVertical:'center'}}>Edit Main Picture</Text>
                                <FontAwesome name="car" size={150} color={Apptheme} />
                            </TouchableOpacity>
                        }

                    </View>
                    
                        {this.state.PremiumDate > 0 &&
                   
                    <FlatList
                        data={this.state.allImages}
                        listKey={(item, index) => 'enterprise-' + index.toString()}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={5}
                        ref={(ref) => { this.ListView_Ref = ref; }}
                        showsVerticalScrollIndicator={false}
                        numColumns={numOfColumns}
                        renderItem={({ item, index }) => (

                            <View key={index} style={styles.subImage}>
                                { (item.url=="" )?
                               
                                <TouchableOpacity 
                                onPress={()=>{
                                    this.setState({
                                        ModalTitle:"Edit Image "+item.position,
                                        selectedPosition:item.position,
                                        selectedpositionUrl:''
                                    },()=>{
                                       this.ToggleModal()
                                    })
                                }}
                                style={{alignItems:'center',}}>
                                <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20 }}>+</Text>
                                <Text style={{ color: '#fff' }}>
                                    {item.name}
                                </Text>
                                </TouchableOpacity>
                                 :
                                 <TouchableOpacity 
                                 onPress={()=>{
                                     this.setState({
                                         ModalTitle:"Edit Image "+item.position,
                                         selectedPosition:item.position,
                                         selectedpositionUrl:item.url
                                     },()=>{
                                        this.ToggleModal()
                                     })
                                     
                                 }}
                                 style={{height:'100%',width:'100%'}}>
                                      <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20,position:'absolute',zIndex:2,top:40,left:50 }}>+</Text>
                                 <Image
                                 resizeMode='cover'
                                 style={{ width: '100%', height: '100%' }}
                                 source={{ uri: item.url }}
                             >
                                 
                             </Image>
                              </TouchableOpacity>
                                }
                            </View>


                        )
                        }
                    />
    }
                   {/* <View style={styles.TextFieldView}>
                      <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.ToggleModal() }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        CHANGE PHOTO
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        SAVE PHOTO
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </ScrollView>

                {this.state.ModalOpen &&
                    <View style={{ position: 'absolute', top:(this.state.selectedpositionUrl=="")? '30%':'20%', height:(this.state.selectedpositionUrl=="")?260:320, width: '80%',marginHorizontal:'10%' }}>
                        <SafeAreaView style={{borderColor:Apptheme,borderWidth:2, borderRadius: 10, height: '100%', width: '96%', marginHorizontal: '2%', backgroundColor: "#fff" }}>
                               <View style={{margin:10,}}>
                                 <Text style={{fontWeight:'bold',textAlign:'center',fontSize:18}}>
                                   {this.state.ModalTitle}
                                </Text>
                               </View>
                            
                            <View style={styles.ModalMainRow}>
                            <View style={styles.ModalSubRow}>
                                    <TouchableOpacity
                                        onPress={() => this.openCamera()}
                                        style={styles.ModalButton}>

                                        <FontAwesome name="camera" color={Apptheme} style={{ fontSize: 30, }} />
                                        <Text style={styles.ModalText}>
                                            TAKE A PHOTO
                                             </Text>
                                    </TouchableOpacity>
                                </View>

                            <View style={styles.ModalSubRow}>
                                <TouchableOpacity
                                    onPress={() => this.openGallery()}
                                    style={styles.ModalButton}>
                                    <FontAwesome name="photo" color={Apptheme} style={{ fontSize: 30, }} />
                                    <Text style={styles.ModalText}>
                                        GALLERY
                                             </Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.selectedpositionUrl != "" &&
                                <View style={styles.ModalSubRow}>
                                    <TouchableOpacity
                                        onPress={() => this.deletePhoto()}
                                        style={styles.ModalButton}>
                                        <AntDesign name="delete" color={Apptheme} style={{ fontSize: 30, }} />
                                        <Text style={styles.ModalText}>
                                            DELETE THIS PHOTO
                                             </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                                

                            </View>
                            {/* <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:10 }}> */}
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, }} activeOpacity={1} onPress={() => this.ToggleModal()} >
                                    <View style={styles.headerModalView}>
                                        <Text style={{ fontSize: 20, color: '#333' }}>
                                            CANCEL
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            {/* </View> */}
                        </SafeAreaView>
                    </View>
                }
            </View>
        )

    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
    },

    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    LoginButtonView: {
        marginTop: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60
    },
    subImage:{
        width:'33%',
        borderColor:'#fff',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:Apptheme,
        backgroundColor:'#C0C0C0',
        // opacity:0.5,
        height:120
    },
    ModalMainRow: {
        marginHorizontal: '5%',
        marginTop: 4,
        flexDirection: 'column',
        width: '90%',
        // height: '60%'
    },
    ModalSubRow:{
        width: '100%', 
         marginVertical: 20
    },
    ModalButton:{
        paddingLeft:20,
        flexDirection:'row' 
    },
    ModalText: {
        fontSize: 18
        , color: Apptheme,
        paddingLeft: 20
    }
});