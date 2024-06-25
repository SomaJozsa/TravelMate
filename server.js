const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;
const DB_PATH = './database.db';

app.use(express.json());
app.use(cors());

const initializeDatabase = (callback) => {
  fs.exists(DB_PATH, (exists) => {
    if (exists) {
      const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error('Hiba az adatbázis megnyitásakor:', err.message);
          process.exit(1);
        } else {
          console.log('Csatlakozva az SQLite adatbázishoz.');
          callback(db);
        }
      });
    } else {
      console.error('Az adatbázis fájl nem található.');
      process.exit(1);
    }
  });
};

initializeDatabase((db) => {
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM USERS WHERE EMAIL = ?';

    db.get(query, [email], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Hiba az adatbázis lekérdezésekor' });
      } else if (row) {
        if (row.PASSWORD === password) {
          res.json({ user: row, message: 'Sikeres bejelentkezés' });
        } else {
          res.status(401).json({ message: 'Érvénytelen email vagy jelszó' });
        }
      } else {
        res.status(404).json({ message: 'Felhasználó nem található' });
      }
    });
  });

  app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO USERS (NEV, EMAIL, PASSWORD) VALUES (?, ?, ?)';

    db.run(query, [username, email, password], function(err) {
      if (err) {
        console.error('Hiba az adatbázisba való íráskor:', err.message);
        res.status(500).json({ error: 'Hiba a felhasználó regisztrálásakor' });
      } else {
        res.json({ message: 'Sikeres regisztráció', userId: this.lastID });
      }
    });
  });

app.get('/api/destination/photo/:destinationName', (req, res) => {
  const { destinationName } = req.params;
  const query = 'SELECT main_photo_url FROM UTAZAS WHERE destination_name = ?';

  db.get(query, [destinationName], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
    } else if (row) {
      res.json({ mainPhotoUrl: row.main_photo_url });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.post('/api/book', (req, res) => {
  const { customerId, destinationId, date } = req.body;
  const priceQuery = 'SELECT AR FROM UTAZAS WHERE ID = ?';

  db.get(priceQuery, [destinationId], function(err, row) {
    if (err) {
      console.error('Error fetching price from database:', err.message);
      res.status(500).json({ error: 'Error fetching price' });
    } else if (row) {
      const price = row.AR;
      const bookingQuery = 'INSERT INTO UTAZAS_USER (customer_id, utazas_id, date, price) VALUES (?, ?, ?, ?)';

      db.run(bookingQuery, [customerId, destinationId, date, price], function(err) {
        if (err) {
          console.error('Error writing to database:', err.message);
          res.status(500).json({ error: 'Error booking trip' });
        } else {
          res.json({ message: 'Trip booked successfully', bookingId: this.lastID, price: price });
        }
      });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
});

  app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
  });
});