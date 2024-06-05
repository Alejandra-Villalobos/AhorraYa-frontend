import React, { useEffect, useState } from "react";
import { Store } from "../interfaces/Stores";
import { Button, Form, Input, Modal, Select } from "antd";
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { getAllDepartmentsService } from "../api/departments";
import { getAllMunicipalitiesService } from "../api/municipalities";
import { Department } from "../interfaces/Departments";
import { Municipality } from "../interfaces/Municipalities";
import { createStoreService } from "../api/stores";
import { ToastContainer } from "react-toastify";

type AddStoreFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  latitude: number;
  longitude: number;
};

const AddStoreForm = ({
  open,
  setOpen,
  latitude,
  longitude,
}: AddStoreFormProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    getAllDepartmentsService(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTc1NjM5MTAsImV4cCI6MTcxODg1OTkxMH0.oSJa6e8I6DLqmqAYVmLlu-RKM7921Wzv3DmjSYWMoGbxcpCODQEhWhuwykGGs2yi"
    ).then((data) => setDepartments(data));
    getAllMunicipalitiesService(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTc1NjM5MTAsImV4cCI6MTcxODg1OTkxMH0.oSJa6e8I6DLqmqAYVmLlu-RKM7921Wzv3DmjSYWMoGbxcpCODQEhWhuwykGGs2yi"
    ).then((data) => setMunicipalities(data));
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values: Store) => {
    values.latitude = latitude;
    values.longitude = longitude;
    console.log(values)
    try {
      await createStoreService(
        "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTc1NjM5MTAsImV4cCI6MTcxODg1OTkxMH0.oSJa6e8I6DLqmqAYVmLlu-RKM7921Wzv3DmjSYWMoGbxcpCODQEhWhuwykGGs2yi",
        values
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Agregar tienda"
      style={{ top: 20 }}
      open={open}
      footer={[]}
      onCancel={() => setOpen(false)}
    >
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-3"
        layout="vertical"
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="description"
          rules={[
            { required: true, message: "Por favor ingrese una descripción" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <span className="flex justify-between">
          <Form.Item
            label="Departamento"
            name="departament"
            rules={[
              {
                required: true,
                message: "Por favor seleccione un departamento",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Seleccione un departamento"
              optionFilterProp="children"
              filterOption={filterOption}
              options={departments.map((department) => ({
                value: department.name,
                label: department.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Municipio"
            name="municipality"
            rules={[
              { required: true, message: "Por favor seleccione un municipio" },
            ]}
          >
            <Select
              showSearch
              placeholder="Seleccione un municipio"
              optionFilterProp="children"
              filterOption={filterOption}
              options={municipalities.map((municipality) => ({
                value: municipality.name,
                label: municipality.name,
              }))}
            />
          </Form.Item>
        </span>
        <Form.Item
          label="Dirección"
          name="direction"
          rules={[
            { required: true, message: "Por favor ingrese una dirección" },
          ]}
        >
          <Input />
        </Form.Item>
        <h1 className="text-sm text-secondary-text py-3 mb-5">
          Información de contacto
        </h1>
        <Form.Item label="Nombre del contacto" name="ownerName">
          <Input
            type="text"
            name="ownerName"
            className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
            prefix={<FiUser size={20} color="#808080" />}
          />
        </Form.Item>
        <Form.Item label="Número de teléfono" name="phone">
          <Input
            type="text"
            name="phone"
            className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
            prefix={<FiPhone size={20} color="#808080" />}
          />
        </Form.Item>
        <Form.Item label="Correo electrónico" name="email">
          <Input
            type="text"
            name="email"
            className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
            prefix={<AiOutlineMail size={20} color="#808080" />}
          />
        </Form.Item>
        <Form.Item label="Sitio web" name="website">
          <Input
            type="text"
            name="website"
            className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
            prefix={<IoIosLink size={20} color="#808080" />}
          />
        </Form.Item>
        <div className="flex justify-between">
          <button
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded-md border-2"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-orange-400 py-2 px-4 text-white rounded-md"
          >
            Guardar
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddStoreForm;