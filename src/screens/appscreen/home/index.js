import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

// packages
import CustomSafeArea from '../../../components/customSafeArea';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {onValue, ref, set, push} from 'firebase/database';
import RBSheet from 'react-native-raw-bottom-sheet';

// constants
import {colors} from '../../../utils/colors';
import {baseStyle} from '../../../utils/baseStyles/theme';
import {iconpathurl} from '../../../assets/iconpath';

// styles
import styles from './styles';

// components
import RbSheetAddBreak from '../../../components/rbSheetAddBreak';

// firebase
import {db} from '../../../database/firebaseConfig';
import Spacer from '../../../components/spacer';
import Button from '../../../components/button';
import {strings} from '../../../constants/strings';

const Home = () => {
  // Get current hour
  const rbSheetRef = useRef();
  const bottomSheetRef = useRef(null);

  // use states
  const [selectedRoom, setSelectedRooms] = useState({});
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [showDevices, setShowDevices] = useState(!showDevices);
  const [deviceType, setDeviceType] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [data, setData] = useState([]);
  const [device, setDevice] = useState([
    {
      roomType: 'LivingRoom1',
      img: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg',
      decives: [
        {
          deviceType: 'Fan',
          status: 1,
          img: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg',
          12: 1,
        },
        {
          deviceType: 'Fan',
          status: 1,
          img: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg',
          13: 1,
        },
        {
          deviceType: 'Fan',
          status: 1,
          img: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg',
          14: 1,
        },
      ],
    },
  ]);

  const addOnData = () => {
    const newRoom = {
      roomType: selectedRoomType,
      img: 'https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/2019/09/16191216/Contemporary-Living-Room-Easy-Functionality.jpg',
      devices: [],
    };
    if (selectedRoomType) {
      set(ref(db, 'board1/device'), {
        device: [...device, newRoom],
      });
      console.log('Room added successfully:', selectedRoomType);
      bottomSheetRef.current.close();
    } else {
      console.log('Please select a room type');
    }
  };

  const handleAddDeviceType = () => {
    if (!deviceType) {
      console.log('Device type cannot be empty');
      return;
    }
    try {
      push(ref(db, `board1/device/${selectedRoom.index}/devices`), {
        deviceType: deviceType,
        img: imageUri,
        status: 0,
      });

      setDeviceType('');
      setImageUri(null);
      setShowBottomSheet(false);

      console.log('Device added successfully to the room.');
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  const imageUpload = () => {};

  const fetchData = useCallback(() => {
    const reference = ref(db, 'board1/device/device');
    onValue(reference, snapshot => {
      const boardData = snapshot.val();
      setDevice(boardData);
    });

    return () => {
      reference.off('value');
    };
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //
  const currentHour = new Date().getHours();
  let greetingMessage;

  // Determine the greeting based on the current hour
  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning 👋🏻';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = 'Good Afternoon 🤗';
  } else if (currentHour >= 17 && currentHour < 21) {
    greetingMessage = 'Good Evening 🫡';
  } else {
    greetingMessage = 'Good Night 😴';
  }

  const updateDeviceStatus = (roomIndex, deviceIndex, device) => {
    try {
      // Create a copy of the device data
      const updatedDeviceData = JSON.parse(JSON.stringify(device));
      // Update the status of the device at the specified roomIndex and deviceIndex
      console.log(updatedDeviceData);
      updatedDeviceData.status = updatedDeviceData.status === 1 ? 0 : 1;

      // Set additional properties "12", "13", or "14" based on deviceIndex
      const additionalProperty =
        deviceIndex === 0 ? '12' : deviceIndex === 1 ? '13' : '14';
      updatedDeviceData[additionalProperty] =
        updatedDeviceData[additionalProperty] === 1 ? 0 : 1;

      console.log(updatedDeviceData);
      // Update the device data state
      // setDevice(updatedDeviceData);
      console.log(device, 'device');

      // Update the device status in the database
      set(ref(db, `board1/device/device/${roomIndex}/decives/${deviceIndex}`), {
        ...updatedDeviceData,
      });
      fetchData();

      console.log('Device status updated successfully.');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleEdit = (roomIndex, deviceIndex, device) => {
    const dataToPass = {
      roomIndex: roomIndex,
      deviceIndex: deviceIndex,
      device: device,
    };
    rbSheetRef.current.open(dataToPass);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.imgContainer(selectedRoom, item, index)}
      onPress={() => {
        setSelectedRooms({item: item?.roomType, index});
        setShowDevices(prevState => !prevState);
      }}>
      <Image source={{uri: item.img}} style={styles.img} />
      <Text style={styles.roomType}>{item.roomType}</Text>
      <Text style={styles.deviceName}>
        {item.device && `${item.device.length} Device`}
      </Text>
    </TouchableOpacity>
  );
  const deciverenderItem = ({item}) => {
    return (
      <>
        {showDevices && (
          <>
            <View style={styles.row}>
              <Text style={styles.item}>{selectedRoom?.item} </Text>
              <Spacer width={widthPercentageToDP('27%')} />
              <TouchableOpacity
                onPress={() => {
                  setIsBottomSheetVisible(true);
                }}>
                <Text style={styles.addDev}>{strings.addDevTxt}</Text>
              </TouchableOpacity>
            </View>
            <Spacer height={heightPercentageToDP('2%')} />
            <FlatList
              data={item}
              numColumns={2}
              keyExtractor={(device, deviceIndex) => deviceIndex.toString()} // Change 'deviceIndex' to whatever unique identifier you have for each device
              renderItem={({item: device, index: deviceIndex}) => (
                <TouchableOpacity key={deviceIndex} style={styles.deviceIndex}>
                  <View>
                    <Image source={{uri: device.img}} style={styles.image} />
                    <TouchableOpacity
                      onPress={() =>
                        handleEdit(selectedRoom?.index, deviceIndex, device)
                      }
                      style={styles.editView}>
                      <Image
                        source={iconpathurl.editIcon}
                        style={styles.editIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <View style={styles.deviceView}>
                      <Text style={styles.deviceText}>{device.deviceType}</Text>
                      <Switch
                        value={device.status === 1 ? true : false}
                        trackColor={{
                          true: colors.grey3B,
                          false: colors.grey3B,
                        }}
                        thumbColor={
                          device.status === 1
                            ? colors.secondaryOrange
                            : colors.blueEA
                        }
                        style={{
                          borderRadius: 20,
                          transform: [{scaleX: 1}, {scaleY: 1}],
                        }}
                        onChange={() =>
                          updateDeviceStatus(
                            selectedRoom?.index,
                            deviceIndex,
                            device,
                          )
                        }
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </>
    );
  };

  return (
    <CustomSafeArea style={styles.container} backgroundColor={colors.grey3B}>
      <View style={styles.mainContainer}>
        <Text
          style={[
            baseStyle.font26px,
            baseStyle.fontWeight700,
            {color: colors.white_FF, fontFamily: 'robo'},
          ]}>
          {greetingMessage}
        </Text>
        <Spacer height={heightPercentageToDP('2%')} />
        <Text style={styles.welcome}>{strings.welcomeHome}</Text>
        <Spacer height={heightPercentageToDP('2%')} />
        <View>
          <View
            style={[baseStyle.flexDirectionColumn, baseStyle.marginTop('2%')]}>
            <View style={styles.rooms}>
              <Text style={styles.roomTxt}>{strings.yourRooms}</Text>
              <TouchableOpacity
                // onPress={() => addOnData()}
                onPress={() => {
                  bottomSheetRef.current.open();
                }}
                style={styles.addOnView}>
                <Text style={styles.add}>{strings.addTxt}</Text>
              </TouchableOpacity>
            </View>
            <Spacer height={heightPercentageToDP('2%')} />
            <FlatList
              style={{width: widthPercentageToDP('90%')}}
              data={device}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <FlatList
            style={styles.list}
            data={
              device
                ?.filter(x => selectedRoom?.item === x.roomType)
                ?.map(x => x.decives) || []
            }
            renderItem={deciverenderItem}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={2}
            // horizontal={false}
            // showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <RbSheetAddBreak rbSheetRef={rbSheetRef} data={data} />
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={heightPercentageToDP('30%')}
        customStyles={{container: styles.rbSheet}}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.label}>Room Type</Text>
          <Spacer height={heightPercentageToDP('2%')} />
          <TextInput
            style={styles.input}
            placeholder="Enter room type"
            placeholderTextColor={colors.grey3B}
            onChangeText={text => setSelectedRoomType(text)}
          />
          <Spacer height={heightPercentageToDP('2%')} />
          <Button
            isPrimaryButton={true}
            btnLabel={strings.add}
            buttonStyle={styles.buttonStyle}
            onPress={() => addOnData()}
          />
        </View>
      </RBSheet>
      {isBottomSheetVisible && (
        <Modal isVisible={isBottomSheetVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.label}>Device Type</Text>
              <Spacer height={heightPercentageToDP('2%')} />
              <TextInput
                style={styles.input}
                placeholder="Enter device type"
                value={deviceType}
                onChangeText={text => setDeviceType(text)}
              />
              <Spacer height={heightPercentageToDP('2%')} />
              <TouchableOpacity onPress={imageUpload} style={styles.input}>
                <Text>Upload Image</Text>
              </TouchableOpacity>
              {imageUri && (
                <Image source={{uri: imageUri}} style={styles.image} />
              )}
              <Spacer height={heightPercentageToDP('2%')} />

              <Button
                isPrimaryButton={true}
                btnLabel="Add Device"
                buttonStyle={styles.buttonStyle}
                onPress={() => handleAddDeviceType()}
              />
              <Spacer height={heightPercentageToDP('2%')} />
              <Button
                isPrimaryButton={true}
                btnLabel="Cancel"
                buttonStyle={styles.buttonStyle}
                onPress={() => setIsBottomSheetVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </CustomSafeArea>
  );
};

export default Home;

// set data in fb database
// const addOnData = () => {
// rbSheetRef.current.open();
// console.log(device);
// try {
//   // Set the data for the 'livingRoom' document under the 'board1' collection
//   // setDevice([...device, device[device.length - 1]]);
//   set(ref(db, 'board1/device'), {
//     device: device,
//   });
//   console.log('device set successfully', device);
// } catch (error) {
//   console.error('Error occurred:', error);
//   console.error('Error stack trace:', error.stack);
// }

{
  /* <Button isPrimaryButton btnLabel={"ON"} /> */
}
// const [breakType, setBreakType] = useState(null);

// const breakTypeData = [
//   {value: '1', label: 'D01'},
//   {value: '2', label: 'D02'},
//   {value: '3', label: 'D03'},
//   {value: '4', label: 'D04'},
//   {value: '5', label: 'D05'},
//   {value: '6', label: 'D06'},
//   {value: '7', label: 'D07'},
//   {value: '8', label: 'D08'},
//   {value: '9', label: 'D09'},
//   {value: '10', label: 'D10'},
//   {value: '11', label: 'D11'},
//   {value: '12', label: 'D12'},
//   {value: '13', label: 'D13'},
//   {value: '14', label: 'D14'},
// ];

{
  /* <SingleDropDown
            value={breakType?.value}
            setValue={(x) => { setBreakType(x) }}
            items={breakTypeData}
            // mainContainerStyle={styles.dropdownMainContainer}
            CustomDropDownContainerStyle={styles.dropdownMainContainer}
          /> */
}
