/* frames-spec.mjs — the film, act by act. Each act lives in tools/spec/fNN.mjs;
   this module only orders them. Acts are remade one at a time: until an act's
   spec module exists here, its previously generated file stays on disk. */
import { F01 } from "./spec/f01.mjs";
import { F02 } from "./spec/f02.mjs";
import { F03 } from "./spec/f03.mjs";
import { F04 } from "./spec/f04.mjs";
import { F05 } from "./spec/f05.mjs";
import { F06 } from "./spec/f06.mjs";
import { F07 } from "./spec/f07.mjs";
import { F08 } from "./spec/f08.mjs";
import { F09 } from "./spec/f09.mjs";
import { F10 } from "./spec/f10.mjs";
import { F11 } from "./spec/f11.mjs";
import { F12 } from "./spec/f12.mjs";

export const FRAMES = [F01, F02, F03, F04, F05, F06, F07, F08, F09, F10, F11, F12];
