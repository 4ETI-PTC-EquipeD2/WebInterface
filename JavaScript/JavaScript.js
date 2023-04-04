import * as L from './Logs.js';
import * as Pokemon from './Pokemon.js';
import * as H from './Header.js';

let Header=new H.header
Header.loader();
let Logs = new L.logs();
let tiplouf = new Pokemon.pokemon(Logs,0);
tiplouf.showPokemon("imPokemon");
