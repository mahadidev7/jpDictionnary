/* eslint-disable react-hooks/rules-of-hooks */
// "use client";
// import { useRouter } from "next/router";



export default function vocab({ params  }) {

// const router = useRouter();
  // const { lesson } = router.query;

  console.log('====================router.query================');
  console.log(params);
  console.log('====================================');



  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{"lesson"}</h1>
    </div>
  );
}
