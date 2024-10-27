import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet
} from 'react-native';
import {HttpRequest} from '../../data/Httprequest';
import {API} from '../../constants/constant';
import {useFormik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {GetAsyncData} from '../../utils/common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import {
  faSolid,
  faBell,
  faBars,
  faPenToSquare,
  faThin,
  faCaretDown,
  faHashtag
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Professional = () => {
  const [userData, setUserData] = useState([]);
  const [startdate, setstartdate] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [endopen, setendOpen] = useState(false);
  const  [selectedName,setSelectedName]=useState([])

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//////////////////////

const [selectedDays, setSelectedDays] = useState({
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
});

const [startTime, setStartTime] = useState({
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
});

const [endTime, setEndTime] = useState({
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
});

const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timePickerMode, setTimePickerMode] = useState('');
  const [currentDay, setCurrentDay] = useState('');




  const showDatePicker = (day, mode) => {
    setCurrentDay(day);
    setTimePickerMode(mode);
    setDatePickerVisible(true);
  };

  console.log(currentDay,"current day--------in show datepicker");
  console.log(timePickerMode,"timepickermode----------in show datepicker");

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };


  const handleConfirm = (date) => {
    console.log(date,"date   -value in handleconfirm ----")
    const formattedTime = dayjs(date).format('HH:mm');
    console.log(formattedTime,"formated time in handle confirm -----")
    if (timePickerMode === 'start') {
      setStartTime((prev) => ({
        ...prev,
        [currentDay]: formattedTime,
      }));
    } else if (timePickerMode === 'end') {
      setEndTime((prev) => ({
        ...prev,
        [currentDay]: formattedTime,
      }));
    }
    hideDatePicker();
  };

  // console.log(startTime,"starttime in handleconfirm value -----")
  // console.log(endTime,"endtime in handleconfirm value -----")
//////////////////////////////////////////////////////////
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = date => {
  //   const timeValue = dayjs(date).format('HH:mm');
  //   console.warn('A date has been picked: ', timeValue);
  //   hideDatePicker();
  // };

  const weekDays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  // const handleCheckboxToggle = (itemId) => {
  //   console.log(itemId,"checkbox itemid")
  //   // setSelectedName(itemId)
  //   if (selectedName.includes(itemId)) {
  //     setSelectedName(prevIds => prevIds.filter(id => id !== itemId)); 
  //   } else {
  //     setSelectedName(prevIds => [...prevIds, itemId]); 
  //   }
  // };

  // console.log(selectedName,"selectedname----  ")

  

  const {handleChange, handleSubmit, values, setValues} = useFormik({
    initialValues: {
      job_title: '',
      website: '',
      bio: '',
      language: [
        {
          name: '',
          level: '',
        },
      ],
      skill: [
        {
          name: '',
          level: '',
        },
      ],
      portfolio: [
        {
          link: '',
          portfolio_title: '',
          description: '',
          details: '',
        },
      ],
      education: [
        {
          degree: '',
          // school:"",
          subjects: '',
          university: '',
          passing_year: '',
        },
      ],
      experience: [
        {
          role: '',
          school: '',
          enddate: '',
          location: '',
          job_title: '',
          startdate: '',
          description: '',
          company_name: '',
        },
      ],
      availability: {
        monday: { isOpen: false, timings: [] },
        tuesday: { isOpen: false, timings: [] },
        wednesday: { isOpen: false, timings: [] },
        thursday: { isOpen: false, timings: [] },
        friday: { isOpen: false, timings: [] },
        saturday: { isOpen: false, timings: [] },
        sunday: { isOpen: false, timings: [] },
      },
      main_category: '',
      total_experience: '',
    },
    onSubmit: async value => {
      console.log(value, 'value in professional----data----formik value --');
      const response = await HttpRequest({
        url: API.PROFILE_PROFESSIONAL,
        method: 'PUT',
        params: value,
      });

      if (response.data) {
        console.log('data save successfully in professional-details-----',response?.data?.availability);
      } else {
        console.log('data not save in profile--professional-details--------');
      }
    },
  });

  useEffect(() => {
    const fetchGetProfileData = async () => {
      try {
        const response = await HttpRequest({
          url: API.PROFILE,
          method: 'GET',
        });

        if (response?.data && response) {
          const professionalData = response?.data?.professional;
          setUserData(professionalData); // Set the user data
          if (professionalData) {

            setValues({
              job_title: professionalData?.job_title || '',
              website: professionalData?.website || '',
              bio: professionalData?.bio || '',
              language: [
                {
                  name: professionalData?.language?.[0]?.name || '',
                  level: professionalData?.language?.[0]?.level || '',
                },
              ],
              skill: [
                {
                  name: professionalData?.skill?.[0]?.name || '',
                  level: professionalData?.skill?.[0]?.level || '',
                },
              ],
              portfolio: [
                {
                  link: professionalData?.portfolio?.[0]?.link || '',
                  portfolio_title:
                    professionalData?.portfolio?.[0]?.portfolio_title || '',
                  description:
                    professionalData?.portfolio?.[0]?.description || ' ',
                  details: professionalData?.portfolio?.[0]?.details || '',
                },
              ],
              education: [
                {
                  degree: professionalData?.education?.[0]?.degree || '',
                  subjects: professionalData?.education?.[0]?.subjects || '',
                  university:
                    professionalData?.education?.[0]?.university || '',
                  passing_year:
                    professionalData?.education?.[0]?.passing_year || '',
                },
              ],
              experience: [
                {
                  role: professionalData?.experience?.[0]?.role || '',
                  school: professionalData?.experience?.[0]?.school || '',
                  enddate: professionalData?.experience?.[0]?.enddate || '',
                  location: professionalData?.experience?.[0]?.location || '',
                  job_title: professionalData?.experience?.[0]?.job_title || '',
                  startdate: professionalData?.experience?.[0]?.startdate || '',
                  description:
                    professionalData?.experience?.[0]?.description || '',
                  company_name:
                    professionalData?.experience?.[0]?.company_name || '',
                },
              ],
              // availability: initialAvailability,
              availability: {
                monday: {
                  isOpen: professionalData?.availability?.monday?.isOpen || false,
                  timings: professionalData?.availability?.monday?.timings || [],
                },
                tuesday: {
                  isOpen: professionalData?.availability?.tuesday?.isOpen || false,
                  timings: professionalData?.availability?.tuesday?.timings || [],
                },
                wednesday: {
                  isOpen: professionalData?.availability?.wednesday?.isOpen || false,
                  timings: professionalData?.availability?.wednesday?.timings || [],
                },
                thursday: {
                  isOpen: professionalData?.availability?.thursday?.isOpen || false,
                  timings: professionalData?.availability?.thursday?.timings || [],
                },
                friday: {
                  isOpen: professionalData?.availability?.friday?.isOpen || false,
                  timings: professionalData?.availability?.friday?.timings || [],
                },
                saturday: {
                  isOpen: professionalData?.availability?.saturday?.isOpen || false,
                  timings: professionalData?.availability?.saturday?.timings || [],
                },
                sunday: {
                  isOpen: professionalData?.availability?.sunday?.isOpen || false,
                  timings: professionalData?.availability?.sunday?.timings || [],
                },
              },
              main_category: professionalData?.main_category || '',
              total_experience: professionalData?.total_experience || '',
            });
          } else {
            console.log('data------not set in value------');
          }
        } else {
          console.log('-response data is not--------come');
        }
      } catch (error) {
        console.log(error.message, 'what is the message');
      }
    };

    fetchGetProfileData();
  }, []);



  const handleCheckboxToggle = (day) => {
    const isOpen = !selectedDays[day]; 
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: isOpen,
    }));
    
    // Update Formik's availability state
    setValues(prevValues => ({
      ...prevValues,
      availability: {
        ...prevValues.availability,
        [day]: { isOpen, timings: isOpen ? [startTime[day], endTime[day]].filter(Boolean) : [] }, 
      },
    }));
  };


  const handleConfirmnew = (date) => {
    const formattedTime = dayjs(date).format('HH:mm');
    if (timePickerMode === 'start') {
      setStartTime((prev) => ({
        ...prev,
        [currentDay]: formattedTime,
      }));
      
      setValues(prevValues => ({
        ...prevValues,
        availability: {
          ...prevValues.availability,
          [currentDay]: {
            ...prevValues.availability[currentDay],
            timings: [formattedTime, endTime[currentDay]].filter(Boolean),
          },
        },
      }));
    } else if (timePickerMode === 'end') {
      setEndTime((prev) => ({
        ...prev,
        [currentDay]: formattedTime,
      }));
      // Update Formik state as well
      setValues(prevValues => ({
        ...prevValues,
        availability: {
          ...prevValues.availability,
          [currentDay]: {
            ...prevValues.availability[currentDay],
            timings: [startTime[currentDay], formattedTime].filter(Boolean), // Include updated end time
          },
        },
      }));
    }
    hideDatePicker();
  };


  console.log(userData.availability,"availbility professional.data ----how ")

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View className="p-2 bg-white">
        <View>
          <Text className="text-center font-extrabold text-2xl text-slate-950">
            Professional -details
          </Text>
          <Text className=" font-semibold mt-2">
            PROFESSIONAL INFORMATION Your information will be published in your
            profile, giving visitors a summary of your professional history and
            expertise.
          </Text>
        </View>
        <View className="mt-4 p-2 rounded-xl">
          <View className="">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Profile</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Enter your job title"
              onChangeText={handleChange('job_title')}
              value={values.job_title}
            />
          </View>
          <View className="mt-2">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Website</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Enter your personal website link"
              onChangeText={handleChange('website')}
              value={values.website}
            />
          </View>
          <View className="mt-2">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Bio</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Describe yourself "
              onChangeText={handleChange('bio')}
              value={values.bio}
            />
          </View>

          {/* availability section---------comes here */}

          <View className="rounded-lg bg-gray-100 mt-4">

          <View style={styles.container}>
      <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Availability</Text>

      {Object.entries(selectedDays).map(([day, isOpen]) => (
        <View key={day} style={styles.availabilityRow}>
          <Text style={styles.dayLabel}>
            {day.charAt(0).toUpperCase() + day.slice(1,3)}
          </Text>

          <CheckBox
            value={isOpen}
            onValueChange={() => handleCheckboxToggle(day)}
          />
          <Text>{isOpen ? 'Available' : 'Unavailable'}</Text>

          <View style={[styles.timeInputs, !isOpen && styles.disabled]}>
            <View style={styles.timeInputContainer}>
              <Text style={styles.timeLabel}>Start time:</Text>
              <TouchableOpacity
                onPress={() => showDatePicker(day, 'start')}
                disabled={!isOpen}
              >
                <Text style={styles.timeInput}>
                  {startTime[day] || "Pick Time"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeInputContainer}>
              <Text style={styles.timeLabel}>End time:</Text>
              <TouchableOpacity
                onPress={() => showDatePicker(day, 'end')}
                disabled={!isOpen}
              >
                <Text style={styles.timeInput}>
                  {endTime[day] || "Pick Time"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirmnew}
        onCancel={hideDatePicker}
        is24Hour={true}
      />
      
    </View>
          </View>




          {/* end of that availability */}

          <View className="mt-2">
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Occupation</Text>
            <TextInput
              className="border rounded-xl  mt-3 p-2 "
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Select your Category"
              onChangeText={handleChange('main_category')}
              value={values.main_category}
            />
          </View>
          <View className="mt-2"> 
            <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>
              Total Experience
            </Text>
            <TextInput
             keyboardType="numeric"
             className="border rounded-xl  mt-3 p-2"
             style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Total_experience"
              onChangeText={handleChange('total_experience')}
              value={values.total_experience}
            />
          </View>
        </View>

        <View className="mt-3 p-2 rounded-xl bg-gray-100">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Skill</Text>
          <View className="">
            <TextInput
              className="border rounded-xl  mt-3 bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Skills"
              onChangeText={handleChange('skill[0].name')}
              value={values?.skill[0].name}
            />
            <View
              className="border rounded-xl  mt-3  bg-white"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}>
              <Picker
                selectedValue={values.skill[0].level}
                onValueChange={handleChange('skill[0].level')}
                value={values?.skill[0].level}
                style={{height: 50, width: '100%'}}
                
                >
                <Picker.Item label="Select Level" value="" />
                <Picker.Item label="Biginner" value="biginner" />
                <Picker.Item label="Intermediate" value="intermediate" />
                <Picker.Item label="Expert" value="expert" />
              </Picker>
            </View>
          </View>
        </View>
        <View className="mt-4 p-2 rounded-xl bg-gray-100">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Language</Text>
          <View className="">
            <TextInput
             className="border rounded-xl  mt-3  bg-white p-2"
             style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Language"
              onChangeText={handleChange('language[0].name')}
              value={values?.language[0].name}
            />
            <View
             className="border rounded-xl  mt-3  bg-white"
             style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              
              >
              <Picker
                selectedValue={values.language[0].level}
                onValueChange={handleChange('language[0].level')}
                value={values?.language[0].level}
                style={{height: 51, width: '100%'}}>
                <Picker.Item label="Select Level" value="" />
                <Picker.Item label="Biginner" value="biginner" />
                <Picker.Item label="Intermediate" value="intermediate" />
                <Picker.Item label="Expert" value="expert" />
              </Picker>
            </View>
          </View>
        </View>

        <View className="mt-4 p-2 rounded-xl bg-gray-100">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Education</Text>
          <View className="">
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Degree Name"
              onChangeText={handleChange('education[0].degree')}
              value={values?.education[0].degree}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="School/Univerity"
              onChangeText={handleChange('education[0].university')}
              value={values?.education[0].university}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Field of study/Subject"
              onChangeText={handleChange('education[0].subjects')}
              value={values?.education[0].subjects}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Passing Year"
              onChangeText={handleChange('education[0].passing_year')}
              value={values?.education[0].passing_year}
            />
          </View>
        </View>
        <View className="mt-4 p-2 rounded-xl bg-gray-100">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Portfolio</Text>
          <View className="">
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Online link of portfolio"
              onChangeText={handleChange('portfolio[0].link')}
              value={values?.portfolio[0].link}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Title"
              onChangeText={handleChange('portfolio[0].portfolio_title')}
              value={values?.portfolio[0].portfolio_title}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Project Details"
              onChangeText={handleChange('portfolio[0].details')}
              value={values?.portfolio[0].details}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Descriptions"
              placeholderTextColor="#A9A9A9"
              onChangeText={handleChange('portfolio[0].description')}
              value={values?.portfolio[0]?.description}
            />
          </View>
        </View>

        <View className="mt-4 p-2 rounded-xl bg-gray-100">
          <Text className="font-semibold" style={{fontSize:18,color:"#464646"}}>Experience</Text>
          <View className="">
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Tilte"
              onChangeText={handleChange('experience[0].job_title')}
              value={values?.experience[0].job_title}
            />
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Company Name"
              onChangeText={handleChange('experience[0].company_name')}
              value={values?.experience[0].company_name}
            />
            <View
              className="border rounded-xl  mt-3  bg-white"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}>
              <Picker
                selectedValue={values.experience[0].role}
                onValueChange={handleChange('experience[0].role')}
                value={values?.experience[0].role}
                style={{height: 50, width: '100%'}}>
                <Picker.Item label="Role" value="" />
                <Picker.Item label="Founder" value="founder" />
                <Picker.Item label="Manager" value="manager" />
                <Picker.Item label="Developer" value="developer" />
                <Picker.Item label="Designer" value="designer" />
                <Picker.Item label="Marketing" value="maketing" />
              </Picker>
            </View>
            <TextInput
              className="border rounded-xl  mt-3  bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Location"
              onChangeText={handleChange('experience[0].location')}
              value={values?.experience[0].location}
            />

            <View className="">
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  // borderWidth: 2,
                  // borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  width: '100%',
                  borderColor:"#C8C8C8AD"
                }}
                className=" rounded-xl  mt-3  bg-white border"
                // style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
                >
                <Text className="  text-slate-900 ">
                  {values?.experience[0].startdate
                    ? values?.experience[0].startdate
                    : 'Start Date'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={startdate}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setstartdate(date);
                  handleChange('experience[0].startdate')(
                    dayjs(date).format('YYYY-MM-DD'),
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
            <View className="">
              <TouchableOpacity
                onPress={() => setendOpen(true)}
                style={{
                  // borderWidth: 2,
                  // borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  width: '100%',
                  borderColor:"#C8C8C8AD"
                }}
                className="border rounded-xl  mt-3 bg-white"
              // style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
                // className="bg-white border-gray-50"
                >
                <Text className="text-slate-900">
                  {values?.experience[0].enddate
                    ? values?.experience[0].enddate
                    : 'End Date'}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={endopen}
                date={enddate}
                mode="date"
                onConfirm={date => {
                  setendOpen(false);
                  setenddate(date);
                  handleChange('experience[0].enddate')(
                    dayjs(date).format('YYYY-MM-DD'),
                  );
                }}
                onCancel={() => {
                  setendOpen(false);
                }}
              />
            </View>
            {/* <TextInput className=" border-2 rounded-xl text-lg mt-2 bg-white border-gray-50" style={{width:"100%"}}placeholder='End Date' onChangeText={handleChange('experience[0].enddate')} value={values?.experience[0].enddate}/> */}
            <TextInput
             
             className="border rounded-xl  mt-3 bg-white p-2"
              style={{width: '100%',height:51, borderColor:"#C8C8C8AD"}}
              placeholder="Description"
              onChangeText={handleChange('experience[0].description')}
              value={values?.experience[0].description}
            />
          </View>
        </View>
        <View className="mt-8 p-2">
          <Text style={{fontSize:17,color:"#8F8F8F"}}>
          Save all the details just by clicking on save button giving below
          </Text>
        </View>
        <TouchableOpacity className=" rounded-2xl mt-3"
          style={{width: 151,height:52,backgroundColor:"#6C63FF"}}>
          <Text
            className="text-2xl p-3 text-center text-white" style={{fontSize:13}}
            onPress={handleSubmit}>
            {userData?.job_title ? 'Edit Details' : 'Save Details'}
          </Text>
          <FontAwesomeIcon icon={faHashtag} size={15} style={{position:"absolute",top:21,left:19,color:"white"}}/>
        </TouchableOpacity>
        <View style={{height:30}}>

        </View>
      </View>
    </ScrollView>
  );
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     margin: 8,
//   },
// });

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayLabel: {
    flex: 1,
    fontSize: 18,
  },
  timeInputs: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeLabel: {
    fontSize: 14,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});
export default Professional;
