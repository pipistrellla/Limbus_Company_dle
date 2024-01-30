import LCMainMenu from "../../../pages/LCMainMenu";
import LCGameMode1 from "../../../pages/LCGameMode1";
import LCGameMode2 from "../../../pages/LCGameMode2";
import LCGameMode3 from "../../../pages/LCGameMode3";
import LCGameMode4 from "../../../pages/LCGameMode4";
import LCError from "../../../pages/LCError";

export const routes = [

    {path: '/LCdle' , component: LCMainMenu },
    {path: '/LCdle/LCGM1', component: LCGameMode1 },
    {path: '/LCdle/LCGM2' ,  component: LCGameMode2  },
    {path: '/LCdle/LCGM3' , component: LCGameMode3 },
    {path: '/LCdle/LCGM4' , component: LCGameMode4 },
    {path: '*' , component: LCMainMenu}

]