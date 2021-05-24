import { DatosPreAprobado } from './datosPreAprobado';
import { DatosBasicos } from './datosBasicos';
import { DatosFinancieros } from './datosFinancieros';


export interface ContactoFormularioPreAprobado {
    DatosBasicos: DatosBasicos;
    DatosFinancieros: DatosFinancieros;
    DatosPreAprobado: DatosPreAprobado;
}
