import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ContratoTempusModule = buildModule("ContratoTempusModule", (m) => {
    // Aqui você pode adicionar parâmetros se o seu contrato necessitar
    // const parameter1 = m.getParameter("parameter1", defaultValue);

    const contratoTempus = m.contract("ContratoTempus", []);

    return { contratoTempus };
});

export default ContratoTempusModule;