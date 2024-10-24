"use client";
import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";


export default function Navigation(){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
};
