import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand'

const RoleStore = create((set) => ({
  isSuccess: false,
  isLoading: false,
  roles: [],
  massage: ''
}));

export const useRole = () => {
  const isSuccess = RoleStore((e) => e.isSuccess);
  const isLoading = RoleStore((e) => e.isLoading);
  const roles = RoleStore((e) => e.roles);
  const massage = RoleStore((e) => e.massage);
  useEffect(() => {
    getRoles()
  }, []);

  const getRoles = async () => {
    try {
      const response = await axios.get(APP_URL_API+'roles', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.data;
      RoleStore.setState({
        roles: data.data
      });
    } catch (error) {
      console.log(error);
      RoleStore.setState({
        massage: error.response.data
      });
    }
  }

  const setRoleStore = (isSuccess, massage) => {
    RoleStore.setState({
      isSuccess: isSuccess,
      massage: massage
    });
  }

  return {isSuccess, isLoading, roles, massage, getRoles, setRoleStore}
}