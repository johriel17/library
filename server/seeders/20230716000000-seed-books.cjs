'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert('books', [
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        book_number: 'BK0001',
        publisher: 'J.B. Lippincott & Co.',
        year: '1960',
        copies: 10,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: '1984',
        author: 'George Orwell',
        book_number: 'BK0002',
        publisher: 'Secker & Warburg',
        year: '1949',
        copies: 15,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        book_number: 'BK0003',
        publisher: 'T. Egerton',
        year: '1813',
        copies: 20,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        book_number: 'BK0004',
        publisher: 'Charles Scribner\'s Sons',
        year: '1925',
        copies: 12,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        book_number: 'BK0005',
        publisher: 'Harper & Brothers',
        year: '1851',
        copies: 8,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        book_number: 'BK0006',
        publisher: 'The Russian Messenger',
        year: '1869',
        copies: 18,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        book_number: 'BK0007',
        publisher: 'Little, Brown and Company',
        year: '1951',
        copies: 13,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        book_number: 'BK0008',
        publisher: 'George Allen & Unwin',
        year: '1954',
        copies: 25,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Animal Farm',
        author: 'George Orwell',
        book_number: 'BK0009',
        publisher: 'Secker & Warburg',
        year: '1945',
        copies: 14,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        book_number: 'BK0010',
        publisher: 'Smith, Elder & Co.',
        year: '1847',
        copies: 11,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        book_number: 'BK0011',
        publisher: 'George Allen & Unwin',
        year: '1937',
        copies: 16,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        book_number: 'BK0012',
        publisher: 'Ballantine Books',
        year: '1953',
        copies: 17,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Adventures of Huckleberry Finn',
        author: 'Mark Twain',
        book_number: 'BK0013',
        publisher: 'Chatto & Windus / Charles L. Webster And Company',
        year: '1884',
        copies: 14,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        book_number: 'BK0014',
        publisher: 'Chatto & Windus',
        year: '1932',
        copies: 19,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Scarlet Letter',
        author: 'Nathaniel Hawthorne',
        book_number: 'BK0015',
        publisher: 'Ticknor, Reed & Fields',
        year: '1850',
        copies: 13,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        book_number: 'BK0016',
        publisher: 'The Russian Messenger',
        year: '1866',
        copies: 21,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
        book_number: 'BK0017',
        publisher: 'The Russian Messenger',
        year: '1880',
        copies: 9,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        book_number: 'BK0018',
        publisher: 'Thomas Cautley Newby',
        year: '1847',
        copies: 15,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'Great Expectations',
        author: 'Charles Dickens',
        book_number: 'BK0019',
        publisher: 'Chapman & Hall',
        year: '1861',
        copies: 17,
        borrowed_copies: 0,
        created: date,
        modified: date
      },
      {
        title: 'The Odyssey',
        author: 'Homer',
        book_number: 'BK0020',
        publisher: 'Ancient Greece',
        year: '800 BC',
        copies: 20,
        borrowed_copies: 0,
        created: date,
        modified: date
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};
