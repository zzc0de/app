import React from "react";
import AddDeviceForm from "../form/AddDeviceForm";
import Axios from 'axios';

const AddDevice = () => {

    function createNewDevice(newDevice) {
        const {deviceType, deviceName, deviceNumber, userName, deviceAddTime} = newDevice
    
        Axios.post('http://localhost:5001/insert', {
          deviceType: deviceType,
          deviceName: deviceName,
          deviceNumber: deviceNumber,
          userName: userName,
          deviceAddTime: deviceAddTime,
        } )
      }

    return (
        <div className="add-device">
          <h1>Add device</h1>
            <AddDeviceForm create={createNewDevice}/>
        </div>
    )
}

export default AddDevice;