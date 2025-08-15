db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('people');

db.people.insert({ name: 'Arppa', number: '040 4044044' });
db.people.insert({ name: 'Rebekka Holi', number: '050 1111115' });