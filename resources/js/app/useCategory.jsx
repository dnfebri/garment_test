import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand'

const CategoryStore = create((set) => ({
  isSuccess: false,
  isLoading: false,
  categorys: [],
  massage: ''
}));

export const useCategory = () => {
  const isSuccess = CategoryStore((e) => e.isSuccess);
  const isLoading = CategoryStore((e) => e.isLoading);
  const categorys = CategoryStore((e) => e.categorys);
  const massage = CategoryStore((e) => e.massage);
  useEffect(() => {
    getCategory()
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get(APP_URL_API+'category', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.data;
      CategoryStore.setState({
        categorys: data.data
      });
    } catch (error) {
      console.log(error);
      CategoryStore.setState({
        massage: error.response.data
      });
    }
  }

  const setCategoryStore = (isSuccess, massage) => {
    CategoryStore.setState({
      isSuccess: isSuccess,
      massage: massage
    });
  }

  return {isSuccess, isLoading, categorys, massage, getCategory, setCategoryStore}
}