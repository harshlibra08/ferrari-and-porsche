import React from "react";
import { 
  Box,
  Portal,
  rem,
  Text,
  Image

} from "@mantine/core";

import { useHeadroom } from "@mantine/hooks";
import LibraLogo from "../images/LibraLogo.png"
function index(){
const pinned = useHeadroom({ fixedAt: 120});




  return (
    <Portal>
      <Box
      sx={() => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        
        height: rem(60),
        zIndex: 1000000,
        transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
        transition: 'transform 400ms ease',
        
      })}
      >
        <Image
        src={LibraLogo}
        alt="Libratherm Logo"
        height={"40px"}
        width={"107px"}
        pl={64}
        pt={12}
        />

        
      </Box>
    </Portal>
  )

   }
export default index;
