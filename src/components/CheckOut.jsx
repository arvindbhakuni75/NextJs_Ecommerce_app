import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCheckOut, removeFromCard } from "../store/addToCardSlice";
import Link from "next/link";
import { useRouter } from "next/router";


const CheckOut = () => {
  const show = useSelector((state) => state.addToCardSlice.showCheckOut);
  const cardItems = useSelector((state) => state.addToCardSlice.cardProducts);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const totalAmount = useMemo(() => {
    cardItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0)
    .toFixed(2);
  }, [cardItems])

  const sentToDetailPage = useCallback((id) => {
    navigate.push(`/product/${id}`);
    dispatch(toggleCheckOut(false));
  }, [navigate]);


  return (
    <div className={`relative z-10 ${show ? "" : "hidden"} `}>
      <div
        onClick={() => dispatch(toggleCheckOut(false))}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className=" fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className=" w-screen max-w-md">
          <div className="flex h-full flex-col  bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Shopping cart
                </h2>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    onClick={() => dispatch(toggleCheckOut(false))}
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="my-6 divide-y divide-gray-200">
                    { (cardItems?.length < 1) && (
                      <div className="flex items-center justify-center">
                        <img src="/emptyTrolley.png" alt="trolley" className="w-[250px] h-[250px]" />
                      </div>
                    ) }
                    {cardItems?.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            className="w-full h-full"
                            alt="product"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <span
                                  onClick={() => sentToDetailPage(item.id)}
                                  className="cursor-pointer"
                                >
                                  {item.title.length > 35
                                    ? item.title.slice(0, 35) + "..."
                                    : item.title}
                                </span>
                              </h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Blue</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty 1</p>
                            <div className="flex">
                              <button
                                onClick={() =>
                                  dispatch(removeFromCard(item.id))
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    onClick={() => dispatch(toggleCheckOut(false))}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> →</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
