import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from ".";
import { useDispatch } from "react-redux";
import { addToCard } from "@/store/addToCardSlice";
import { useRouter } from "next/router";


const Card = ({data}) => {
  const { id, image, title, price, description } = data
  const dispatch = useDispatch();
  const navigate = useRouter()


  return (
    <div className="w-[300px] flex flex-col justify-between border border-gray-300 shadow-2xl rounded-lg p-4 h-[420px] bg-white">
      <Link href={`/product/${id}`}>
        <div className="w-full">
          <img
            className="rounded w-full h-[200px]"
            src={image}
            alt="image"
            // width={100}
            // height={150}
          />
          <div className="w-full felx justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {title.length > 20 ? title.slice(0, 20) + "..." : title}
            </h2>
            <h2 className="text-lg font-bold text-gray-800">${price}</h2>
          </div>

          <p className="text-gray-600 pb-2">
            {description.length > 70
              ? description.slice(0, 70) + "..."
              : description}
          </p>
        </div>
      </Link>
      <div className="w-full flex justify-between items-center">
        <Button 
          onClick={() => navigate.push(`/product/${id}`)} 
          className="bg-transparent py-2 px-4 text-black border  rounded">
            View Details
        </Button>
        <Button 
          onClick={() => dispatch(addToCard({data}))} 
          className="bg-yellow-500 py-2 px-4 text-white rounded"
        >
          Add To Card
        </Button>
      </div>
    </div>
  );
};

export default memo(Card);
