import { json } from "body-parser";
function normalizeObject(inputObject) {
    // Parse the "secondLevel" string to an array of objects
    const secondLevelArray = JSON.parse(inputObject.secondLevel);

    // Normalize each object in the array
    const normalizedSecondLevel = secondLevelArray.map(item => {
        return {
            key: item.key,
            name: item.name,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
        };
    });

    // Create the normalized object with the updated "secondLevel" array
    const normalizedObject = {
        k: inputObject.k,
        total: inputObject.total,
        created_at: inputObject.created_at,
        secondLevel: normalizedSecondLevel,
    };

    return normalizedObject;
}
module.exports = normalizeObject;
// Example input object
// const inputObject = {
//     "k": 2,
//     "total": 330000,
//     "created_at": "Sat Jul 08 2023 21:26:39 GMT+0700 (Indochina Time)",
//     "secondLevel": "[{key:4,name:Robot đồ chơi,price:100000.000,quantity:3}]"
// };

// const normalizedObject = normalizeObject(inputObject);

// console.log(JSON.stringify(normalizedObject, null, 4));
