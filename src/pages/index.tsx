import { Base } from "./Base/Base";
import { Converter as ConverterPage } from "./Converter/Converter";
import { ConverterContextProvider } from "./Converter/ConverterContext";

const Converter = () => <ConverterContextProvider><ConverterPage /></ConverterContextProvider>

export {
    Base,
    Converter
}