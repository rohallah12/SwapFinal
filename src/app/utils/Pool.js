import { ethers } from "ethers"

//address har token ye meghdar hex hast, baraye inke betavanim pool haro rahat tar peyda konim bayad in 2 meghdar ro
//az kocheck be bozorg sort konim
export const sortTokens = (token_a, token_b) => {
    //convert tokena to int
    const token_a_value = ethers.toBigInt(token_a)
    //convert tokenb to int
    const token_b_value = ethers.toBigInt(token_b)
    //sort
    return token_a_value > token_b_value ? [token_b, token_a] : [token_a, token_b]
}

export const calculateAmountsOut = () => { }