import World from "../components/World";
import Top from "../components/Top"
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function WorldPage() {
  
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('token')) router.push('/login') 
  }, [])

  return (
    <>
      <Top/>
      <World />
    </>
  );
}