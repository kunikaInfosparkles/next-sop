"use client";

import { errorMsg } from "@/services/customFn";
import { httpService } from "@/services/httpServices";
import { ProductsResponse } from "@/types/product";
import { useState } from "react";


const useProductsService = () => {
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await httpService.get<ProductsResponse>("/products");
      return res;
    } catch (error:any) {
      errorMsg(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getProducts };
};

export default useProductsService;
