import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import useFetchUrl from "@/hooks/useFetchUrl";
import { Button } from "@/components";
import { addToCard } from "../../../store/addToCardSlice";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
import { DetailCardSkeleton } from "@/components";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  console.log(id)

  const { data, loading, error } = useFetchUrl(`/${id}`);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  const handleQuantity = (action) => {
    if (action === "increment" && quantity < 10) {
      setQuantity(quantity + 1);
    }

    if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {  
    return <DetailCardSkeleton />;
  }

  if (error) {
    return <h2 className="text-2xl text-rose-500">{error}</h2>;
  }

  
    return (
      <div className="w-full min-h-screen-[70px] flex justify-center items-center p-4 gap-3">
     <div className="w-3/4 flex justify-between border border-gray-300 shadow-2xl gap-6 rounded-lg p-4 min-h-[520px] bg-white">
       <div className="w-full flex items-center">
         <span>
           <img
             className="rounded w-full max-h-[450px]"
             src={data?.image}
             alt="productImage"
           />
         </span>
       </div>
       <div className=" w-full flex flex-col gap-y-6">
         <div className="flex justify-between">
           <h2 className="text-xl font-bold text-gray-900">{data?.title}</h2>
           <h2 className="text-lg font-bold text-gray-800">${data?.price}</h2>
         </div>
         <p className="text-gray-600 pb-2">{data?.description}</p>
         <div className="w-full flex flex-col justify-between items-center gap-4">
           <div className="lg:flex justify-between bg-transparent py-2 px-4 text-black border w-full rounded">
             <div className="flex gap-4 mb-2 lg:mb-0">
               <Button
                 type="button"
                   onClick={() => handleQuantity("decrement")}
                 className="px-6 border rounded "
               >
                 -
               </Button>
               <div className="text-gray-800">Quantity: {quantity}</div>
               <Button
                 type="button"
                   onClick={() => handleQuantity("increment")}
                 className="px-6 border rounded "
               >
                 +
               </Button>
             </div>

             <div className="mt-auto mb-auto"> 
               <span className="flex items-center py-1 px-3 bg-[#171030] rounded text-white">{data?.rating?.rate}/5<span ><FaStar className="ml-2 text-yellow-500 text-xl" /> </span> <span>({data?.rating?.count})</span> </span>
             </div>
           </div>
           <Button
               onClick={() => dispatch(addToCard({ data }))}
             className="bg-yellow-500 py-2 px-4 text-white w-full rounded"
           >
             Add To Card
           </Button>
         </div>
       </div>
     </div>
   </div>
 )  
};

export default memo(ProductDetail);
