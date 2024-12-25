// "use client";
// import React from "react";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { decryptKey, encryptKey } from "@/lib/utils";
// import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

// export const PasskeyModal = () => {
//   const router = useRouter();
//   const path = usePathname();
//   const [open, setOpen] = useState(true);
//   const [passkey, setPasskey] = useState("");
//   const [error, setError] = useState("");

//   const encryptedKey =
//     typeof window !== "undefined"
//       ? window.localStorage.getItem("accessKey")
//       : null;

//   useEffect(() => {
//     const accessKey = encryptedKey && decryptKey(encryptedKey);

//     if (path)
//       if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
//         setOpen(false);
//         router.push("/admin");
//       } else {
//         setOpen(true);
//       }
//   }, [encryptedKey]);

//   const closeModal = () => {
//     setOpen(false);
//     router.push("/");
//   };

//   const validatePasskey = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();

//     if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
//       const encryptedKey = encryptKey(passkey);

//       localStorage.setItem("accessKey", encryptedKey);

//       setOpen(false);
//     } else {
//       setError("Invalid passkey. Please try again.");
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger>Open</AlertDialogTrigger>
//       <AlertDialogContent className="shad-alert-dialog">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="flex items-start justify-between">
//             Admin Access Verification
//             <Image
//               src="/assets/icons/close.svg"
//               alt="close"
//               width={20}
//               height={20}
//               onClick={() => closeModal()}
//               className="cursor-pointer"
//             />
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             To access the admin page, please enter the passkey.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <div>
//           <InputOTP
//             maxLength={6}
//             value={passkey}
//             onChange={(value) => setPasskey(value)}
//           >
//             <InputOTPGroup className="shad-otp">
//               <InputOTPSlot className="shad-otp-slot" index={0} />
//               <InputOTPSlot className="shad-otp-slot" index={1} />
//               <InputOTPSlot className="shad-otp-slot" index={2} />
//               <InputOTPSlot className="shad-otp-slot" index={3} />
//               <InputOTPSlot className="shad-otp-slot" index={4} />
//               <InputOTPSlot className="shad-otp-slot" index={5} />
//             </InputOTPGroup>
//           </InputOTP>

//           {error && (
//             <p className="shad-error text-14-regular mt-4 flex justify-center">
//               {error}
//             </p>
//           )}
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogAction
//             onClick={(e) => validatePasskey(e)}
//             className="shad-primary-btn w-full"
//           >
//             Enter Admin Passkey
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };















"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { encryptKey } from "@/lib/utils";

interface PasskeyModalProps {
  onClose?: () => void; // Optional callback to handle modal close
}

export const PasskeyModal: React.FC<PasskeyModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true); // Modal opens when triggered
  const [passkey, setPasskey] = useState<string>(""); // Stores the entered passkey
  const [error, setError] = useState<string>(""); // Error message for invalid passkey

  // Validate the entered passkey
  const validatePasskey = (e: React.FormEvent) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      onClose && onClose(); // Notify parent to close the modal
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    onClose && onClose(); // Notify parent to close the modal
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value: string) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
