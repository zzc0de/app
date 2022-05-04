import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import DeviceLists from "../DeviceLists";
import SearchData from "../UI/search/SearchData";
import Modal from "../UI/modal/Modal";
import AddDeviceForm from "../form/AddDeviceForm";

const DeviceSearch = () => {
  const [devices, setDevices] = useState([
    {
      id: "",
      deviceType: "",
      deviceName: "",
      deviceNumber: "",
      userName: "",
      deviceAddTime: "",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [updateDeviceId, setUpdateDeviceId] = useState('');

  // Load and filter devices

  useEffect(() => {
    Axios.get("http://localhost:5001/devices").then((response) => {
      setDevices(response.data);
    });
  }, []);

  const filterData = devices.filter((item) => {
    return Object.keys(item).some((key) =>
      String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Delete device

  function removeDevice(id) {
    Axios.delete(`http://localhost:5001/device/${id}`)
  }

  // Update device

  function getUpdateDeviceInfo(id) {
    Axios.get(`http://localhost:5001/device/${id}`).then((response) => {
      setUpdateDeviceId(response.data[0])
    })
  }

  const handleUpdateDevice = (id) => {
    setModalActive(true);
    getUpdateDeviceInfo(id);
  }

  return (
    <div className="device-search">
      <Modal visible={modalActive} setVisible={setModalActive}>
        <AddDeviceForm updateInfo={updateDeviceId}/>
      </Modal>
      <SearchData
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleChange}
      />
      <DeviceLists
        update={handleUpdateDevice}
        remove={removeDevice}
        title="Список устройств"
        devices={filterData}
      />
    </div>
  );
};

export default DeviceSearch;
