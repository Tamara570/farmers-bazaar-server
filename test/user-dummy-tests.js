function makeUser() {
  return [
    {
      id: 01,
      user_name: 'MrFarmer007',
      password: 'p4ssW0rD',
    },
    {
      id: 02,
      user_name: 'MrsFarmer123',
      password: 'PassW0rD',
    },
  ];
}

function makeMaliciousUser() {
  const maliciousUser = {
    id: 0,
    user_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    password: 'Naughty naughty very naughty <script>alert("xss");</script>',
  };
  const expectedUser = {
    ...maliciousUser,
    user_name:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;', // converts script to render it inert
    password:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;', // converts script to render it inert
  };
  return {
    maliciousUser,
    expectedUser,
  };
}

module.exports = {
  makeUser,
  makeMaliciousUser,
};
