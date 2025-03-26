'use client';
import { useEffect } from "react";
import { getCurrentCustomerData } from "@/server/actions/getCurrentCustomerData";
import { useCookies } from "next-client-cookies";
import {useStore} from "@/store/useStore";

const StoreManager = () => {
  const cookies = useCookies();
  const { setCurrentCustomer } = useStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (Number(cookies.get('customerId'))) {
          const currentUserRes = await getCurrentCustomerData(Number(cookies.get('customerId')));
          if (currentUserRes.success && currentUserRes.data) {
            setCurrentCustomer(currentUserRes.data)
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
  }, [])

  return (
    <></>
  )
}

export default StoreManager;