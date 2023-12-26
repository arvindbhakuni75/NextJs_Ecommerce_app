import { useEffect, memo, useMemo } from "react";
import { Card } from "@/components";
import { CardSkeleton } from '.'
import useFetchUrl from "@/hooks/useFetchUrl";

const AllProducts = () => {
  const { data, loading, error } = useFetchUrl();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (error) {
    return <h2 className="text-2xl text-rose-500">{error}</h2>;
  }

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center p-4 gap-3">
      { data?.map((item) => <Card key={item.id} data={item} />) }
    </div>
  );
};

export default memo(AllProducts);
