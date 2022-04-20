import React, { useEffect, useState } from "react";
import DeviceLists from "./components/DeviceLists";
import AddDeviceForm from "./components/form/AddDeviceForm";
import Axios from 'axios'
import "./styles/App.css";
import SearchData from "./components/UI/search/SearchData";

function App() {
  
  const [devices, setDevices] = useState([
    {
      id: '',
      deviceType: '',
      deviceName: '',
      deviceNumber: '',
      userName: '',
      deviceAddTime: '',
    },
  ]);
  
  useEffect(() => {
    Axios.get('http://localhost:50001/read').then((response) => {
      setDevices(response.data)
    });
  }, []);

  function createNewDevice(newDevice) {
    const {deviceType, deviceName, deviceNumber, userName} = newDevice

    Axios.post('http://localhost:5001/insert', {
      deviceType: deviceType,
      deviceName: deviceName,
      deviceNumber: deviceNumber,
      userName: userName,
    } )
  }

  function removeDevice(device) {
    setDevices(devices.filter(d => d.id !== device.id))
  }

  return (
    <div className="App">
      <AddDeviceForm create={createNewDevice}/>
      <SearchData />
      <DeviceLists remove={removeDevice} title="Devices" devices={devices} />
    </div>
  );
}

export default App;
