function makeVendors() {
  return [
    {
      id: 01,
      user_id: 01,
      name: 'Apple',
      description: 'a red Apple',
      streetaddress: '6428 Manning Ave N',
      city: 'Stillwater',
      state: 'MN',
      zip: '55082',
      phone: '(651) 439-3127',
      email: 'Aamodtsapple@gmail.com',
    },
    {
      id: 02,
      user_id: 02,
      name: 'Banana ',
      description: 'a yellow banana',
      streetaddress: '6428 Manning Ave N',
      city: 'Stillwater',
      state: 'MN',
      zip: '55082',
      phone: '(651) 439-3127',
      email: 'Aamodtsapple@gmail.com',
    },
  ];
}

function makeMaliciousVendor() {
  const maliciousVendor = {
    id: 0,
    name:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    vendor_short_description:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    streetaddress: 'the moon',
    city: 'out of space',
    state: 'Milky Way',
    zip: '00000',
    phone: '(123) 857-5309',
    email: 'gotcha@gmail.com',
    date_created: new Date(),
  };
  const expectedVendor = {
    ...maliciousVendor,
    name:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;', // converts script to render it inert
    vendor_short_description:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;', // converts script to render it inert
  };
  return {
    maliciousVendor,
    expectedVendor,
  };
}

module.exports = {
  makeVendors,
  makeMaliciousVendor,
};
