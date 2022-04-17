import React, { useState } from "react";
import DeviceLists from "./components/DeviceLists";
import AddDeviceForm from "./components/form/AddDeviceForm";
import "./styles/App.css";

function App() {
  const [devices, setDevices] = useState([
    {
      id: '',
      deviceType: '',
      deviceName: '',
      deviceNumber: '',
      userName: '',
      deviceAddTime: Date.now(),
    },
  ]);

  function createNewDevice(newDevice) { 
    let result = await fetch(
      'http://localhost:50001/register', 
      {
      method: 'POST',
      body: JSON.stringify({newDevice}),
      headers: {
        'Content-Type': 'aplication/json' 
      }
    })

    result = await result.json();

    setDevices([...devices, newDevice])
  }

  function removeDevice(device) {
    setDevices(devices.filter(d => d.id !== device.id))
  }

  return (
    <div className="App">
      <AddDeviceForm create={createNewDevice}/>
      <DeviceLists remove={removeDevice} title="Devices" devices={devices} />
    </div>
  );
}

export default App;
