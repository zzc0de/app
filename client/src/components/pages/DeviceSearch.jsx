import React, { useEffect, useState } from "react";
import axios from "axios";
import DeviceLists from "../DeviceLists";
import Modal from "../UI/modal/Modal";
import ENV from "../../env.config";
import UpdateDeviceForm from "../form/UpdateDeviceForm";
import Pagination from "../UI/pagination/Pagination";
import '../../styles/App.css'
import AddDeviceForm from "../form/AddDeviceForm";
import { useDispatch, useSelector } from "react-redux";
import { loadDevices } from "../../store/actions/devicesActions";

const DeviceSearch = ({
  searchQuery, 
  setPageName,
  setDevices, 
  modalActive, 
  setModalActive}) => {

  let dispatch = useDispatch();
  const {devices} = useSelector(state => state.devices)

  const [updateDeviceId, setUpdateDeviceId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage] = useState(25);

  useEffect(() => {
    dispatch(loadDevices())
  }, [setPageName])


  const indexOfLastDevice = currentPage * devicesPerPage;
  const indefOfFirstDevice = indexOfLastDevice - devicesPerPage;

  const filterData = devices.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).slice(indefOfFirstDevice, indexOfLastDevice);

  const pageNumberHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  setPageName('deviceSearhPage');

  // Delete device

  function removeDevice(id) {
    axios.delete(`${ENV.HOSTNAME}device/${id}`).then((response) => {
      const indexOfDelitedItem = devices.filter(
        (item) => item._id !== response.data.id
      );
      setDevices(indexOfDelitedItem);
    });
  }

  // Update device

  function getUpdateDeviceInfo(id) {
    axios.get(`${ENV.HOSTNAME}device/${id}`).then((response) => {
      setUpdateDeviceId(response.data[0]);
    });
  }

  const handleUpdateDeviceInfo = (id) => {
    setModalActive(true);
    getUpdateDeviceInfo(id);
  };

  function createNewDevice(newDevice) {
    const {type, name, number, user, addTime} = newDevice

    axios.post(`${ENV.HOSTNAME}insert`, {
      type: type,
      name: name,
      number: number,
      user: user,
      addTime: addTime,
    }).
    then((response) => {
      setDevices([...devices, response.data]);
    })
  }

  return (
    <div className="content-container__inner">
      <Modal visible={modalActive} setVisible={setModalActive}>
        <UpdateDeviceForm
          updateInfo={updateDeviceId}
          modal={setModalActive}
          devices={devices}
          setDevices={setDevices}
        />
      </Modal>
      <div className="devices-list">
      <DeviceLists
        update={handleUpdateDeviceInfo}
        remove={removeDevice}
        title="Список устройств"
        devices={filterData}
      />
       <Pagination
        devicesPerPage={devicesPerPage}
        totalDevices={devices.length}
        paginate={pageNumberHandler}
        currentPage={currentPage}
      />
      </div>
      <div className="add-device-block">
        <AddDeviceForm create={createNewDevice}/>
      </div>
    </div>
  );
};

export default DeviceSearch;
