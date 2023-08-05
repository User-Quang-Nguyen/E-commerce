const normalizeObject = require('./apps/service/normalObject');

test('Normalize object - Test case 1', () => {
  const inputObject = {
    "k": 1,
    "total": 4785000,
    "created_at": "Sat Jul 08 2023 21:23:11 GMT+0700 (Indochina Time)",
    "secondLevel": "[{\"key\":1\",\"name\":\"Váy ngắn\",\"price\":2000000.000,\"quantity\":2},{\"key\":2\",\"name\":\"Robot đồ chơi\",\"price\":100000.000,\"quantity\":3},{\"key\":3\",\"name\":\"Búp bê\",\"price\":50000.000,\"quantity\":1}]"
  };

  const expectedOutput = {
    "k": 1,
    "total": 4785000,
    "created_at": "Sat Jul 08 2023 21:23:11 GMT+0700 (Indochina Time)",
    "secondLevel": [
      {
        "key": 1,
        "name": "Váy ngắn",
        "price": 2000000,
        "quantity": 2
      },
      {
        "key": 2,
        "name": "Robot đồ chơi",
        "price": 100000,
        "quantity": 3
      },
      {
        "key": 3,
        "name": "Búp bê",
        "price": 50000,
        "quantity": 1
      }
    ]
  };

  const normalizedObject = normalizeObject(inputObject);
  expect(normalizedObject).toEqual(expectedOutput);
});